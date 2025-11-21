/**
 * Figma Landing Page Extractor
 * Fetches specific node data from the SoulPrint page
 */

import https from 'https';
import fs from 'fs';

const FIGMA_TOKEN = 'YOUR_FIGMA_TOKEN';
const FILE_KEY = 'UjQOp2Zumw0asIRn84n12S';
const SOULPRINT_PAGE_ID = '18862:42390'; // The SoulPrint page from the URL

function fetchFigmaAPI(endpoint) {
    return new Promise((resolve, reject) => {
        const url = `https://api.figma.com/v1/${endpoint}`;
        const options = {
            headers: {
                'X-Figma-Token': FIGMA_TOKEN
            }
        };

        https.get(url, options, (res) => {
            const chunks = [];

            res.on('data', (chunk) => {
                chunks.push(chunk);
            });

            res.on('end', () => {
                const buffer = Buffer.concat(chunks);

                if (res.statusCode === 200) {
                    try {
                        const data = JSON.parse(buffer.toString());
                        resolve(data);
                    } catch (err) {
                        reject(new Error(`Failed to parse JSON: ${err.message}`));
                    }
                } else {
                    reject(new Error(`HTTP ${res.statusCode}: ${buffer.toString().substring(0, 200)}`));
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

function extractColors(node, colors = new Set()) {
    if (!node) return colors;

    // Extract fill colors
    if (node.fills && Array.isArray(node.fills)) {
        node.fills.forEach(fill => {
            if (fill.type === 'SOLID' && fill.color) {
                const { r, g, b, a = 1 } = fill.color;
                const hex = `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`;
                colors.add(JSON.stringify({ hex, opacity: a, name: node.name }));
            }
        });
    }

    // Extract stroke colors
    if (node.strokes && Array.isArray(node.strokes)) {
        node.strokes.forEach(stroke => {
            if (stroke.type === 'SOLID' && stroke.color) {
                const { r, g, b, a = 1 } = stroke.color;
                const hex = `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`;
                colors.add(JSON.stringify({ hex, opacity: a, name: node.name }));
            }
        });
    }

    if (node.children) {
        node.children.forEach(child => extractColors(child, colors));
    }

    return colors;
}

function extractTypography(node, typography = []) {
    if (!node) return typography;

    if (node.type === 'TEXT' && node.style) {
        typography.push({
            name: node.name,
            fontFamily: node.style.fontFamily,
            fontSize: node.style.fontSize,
            fontWeight: node.style.fontWeight,
            lineHeight: node.style.lineHeightPx,
            letterSpacing: node.style.letterSpacing,
            textAlign: node.style.textAlignHorizontal
        });
    }

    if (node.children) {
        node.children.forEach(child => extractTypography(child, typography));
    }

    return typography;
}

function analyzeNode(node, depth = 0) {
    const indent = '  '.repeat(depth);
    const size = node.absoluteBoundingBox
        ? `${Math.round(node.absoluteBoundingBox.width)}x${Math.round(node.absoluteBoundingBox.height)}`
        : 'no size';

    console.log(`${indent}- ${node.type}: "${node.name}" (${size})`);

    if (node.children && depth < 3) {
        node.children.forEach(child => analyzeNode(child, depth + 1));
    } else if (node.children) {
        console.log(`${indent}  ... ${node.children.length} more children`);
    }
}

async function main() {
    try {
        console.log('🎨 Extracting SoulPrint Landing Page from Figma...\n');
        console.log('='.repeat(60) + '\n');

        // Get the specific node data
        console.log('📡 Fetching SoulPrint page data...');
        const nodeData = await fetchFigmaAPI(`files/${FILE_KEY}/nodes?ids=${SOULPRINT_PAGE_ID}`);

        const pageNode = nodeData.nodes[SOULPRINT_PAGE_ID];
        if (!pageNode || !pageNode.document) {
            throw new Error('Could not find SoulPrint page in Figma file');
        }

        console.log('\n✅ Found SoulPrint page!');
        console.log(`   Name: ${pageNode.document.name}`);
        console.log(`   Type: ${pageNode.document.type}`);
        console.log(`   Children: ${pageNode.document.children?.length || 0}\n`);

        // Analyze structure
        console.log('📐 Page Structure:');
        analyzeNode(pageNode.document);

        // Extract colors
        console.log('\n🎨 Extracting colors...');
        const colors = Array.from(extractColors(pageNode.document)).map(c => JSON.parse(c));
        const uniqueColors = [...new Map(colors.map(c => [c.hex, c])).values()];
        console.log(`   Found ${uniqueColors.length} unique colors\n`);

        // Extract typography
        console.log('📝 Extracting typography...');
        const typography = extractTypography(pageNode.document);
        const uniqueFonts = [...new Map(typography.map(t => [`${t.fontFamily}-${t.fontSize}-${t.fontWeight}`, t])).values()];
        console.log(`   Found ${uniqueFonts.length} unique text styles\n`);

        // Show sample typography
        if (uniqueFonts.length > 0) {
            console.log('📝 Typography Styles:');
            uniqueFonts.slice(0, 10).forEach(font => {
                console.log(`   - ${font.fontFamily} ${font.fontWeight} ${font.fontSize}px`);
            });
            if (uniqueFonts.length > 10) {
                console.log(`   ... and ${uniqueFonts.length - 10} more\n`);
            }
        }

        // Save extracted data
        const landingPageData = {
            page: {
                id: SOULPRINT_PAGE_ID,
                name: pageNode.document.name,
                type: pageNode.document.type
            },
            frames: pageNode.document.children?.map(child => ({
                id: child.id,
                name: child.name,
                type: child.type,
                width: child.absoluteBoundingBox?.width,
                height: child.absoluteBoundingBox?.height,
                backgroundColor: child.backgroundColor
            })) || [],
            colors: uniqueColors,
            typography: uniqueFonts,
            structure: pageNode.document,
            extractedAt: new Date().toISOString()
        };

        console.log('\n💾 Saving landing page data...');
        fs.writeFileSync('landing-page-design.json', JSON.stringify(landingPageData, null, 2));
        console.log('   ✓ landing-page-design.json\n');

        console.log('='.repeat(60));
        console.log('🚀 Landing page data extracted successfully!\n');
        console.log('📊 Summary:');
        console.log(`   • ${landingPageData.frames.length} frames/sections`);
        console.log(`   • ${uniqueColors.length} colors`);
        console.log(`   • ${uniqueFonts.length} typography styles\n`);
        console.log('💡 Ready to build your landing page!');
        console.log('='.repeat(60) + '\n');

        return landingPageData;
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    }
}

main();

export { fetchFigmaAPI };
