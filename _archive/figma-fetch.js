/**
 * Figma Design Fetcher - API Efficient Version
 * Uses Figma API endpoints to get specific data without loading entire file
 */

import https from 'https';
import fs from 'fs';

const FIGMA_TOKEN = 'YOUR_FIGMA_TOKEN';
const FILE_KEY = 'UjQOp2Zumw0asIRn84n12S';

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

async function main() {
    try {
        console.log('🎨 SoulPrint 2025 - Figma Design Fetcher\n');
        console.log('='.repeat(50) + '\n');

        // Step 1: Get file metadata (lightweight)
        console.log('📋 Fetching file information...');
        const fileInfo = await fetchFigmaAPI(`files/${FILE_KEY}?depth=1`);

        console.log('\n✅ File Information:');
        console.log(`   📄 Name: ${fileInfo.name}`);
        console.log(`   📅 Last Modified: ${new Date(fileInfo.lastModified).toLocaleString()}`);
        console.log(`   🔢 Version: ${fileInfo.version}\n`);

        // Extract pages
        const pages = fileInfo.document.children || [];
        console.log(`📚 Found ${pages.length} page(s):\n`);
        pages.forEach((page, i) => {
            console.log(`   ${i + 1}. ${page.name} (ID: ${page.id})`);
        });

        // Step 2: Get file styles (colors, typography, etc.)
        console.log('\n🎨 Fetching design styles...');
        const styles = await fetchFigmaAPI(`files/${FILE_KEY}/styles`);

        const stylesByType = {
            FILL: [],
            TEXT: [],
            EFFECT: [],
            GRID: []
        };

        if (styles.meta && styles.meta.styles) {
            styles.meta.styles.forEach(style => {
                if (stylesByType[style.style_type]) {
                    stylesByType[style.style_type].push(style);
                }
            });
        }

        console.log('\n📊 Design Styles:');
        console.log(`   🎨 Colors (FILL): ${stylesByType.FILL.length}`);
        console.log(`   📝 Typography (TEXT): ${stylesByType.TEXT.length}`);
        console.log(`   ✨ Effects: ${stylesByType.EFFECT.length}`);
        console.log(`   📐 Grids: ${stylesByType.GRID.length}\n`);

        // Show sample colors
        if (stylesByType.FILL.length > 0) {
            console.log('🎨 Color Styles:');
            stylesByType.FILL.slice(0, 10).forEach(style => {
                console.log(`   - ${style.name}`);
            });
            if (stylesByType.FILL.length > 10) {
                console.log(`   ... and ${stylesByType.FILL.length - 10} more`);
            }
            console.log('');
        }

        // Show sample typography
        if (stylesByType.TEXT.length > 0) {
            console.log('📝 Typography Styles:');
            stylesByType.TEXT.slice(0, 10).forEach(style => {
                console.log(`   - ${style.name}`);
            });
            if (stylesByType.TEXT.length > 10) {
                console.log(`   ... and ${stylesByType.TEXT.length - 10} more`);
            }
            console.log('');
        }

        // Step 3: Get components
        console.log('🧩 Fetching components...');
        const components = await fetchFigmaAPI(`files/${FILE_KEY}/components`);

        const componentList = Object.values(components.meta.components || {});
        console.log(`   Found ${componentList.length} component(s)\n`);

        if (componentList.length > 0) {
            console.log('🧩 Components:');
            componentList.slice(0, 15).forEach(comp => {
                console.log(`   - ${comp.name}`);
            });
            if (componentList.length > 15) {
                console.log(`   ... and ${componentList.length - 15} more`);
            }
            console.log('');
        }

        // Create summary
        const summary = {
            file: {
                name: fileInfo.name,
                key: FILE_KEY,
                lastModified: fileInfo.lastModified,
                version: fileInfo.version,
                thumbnailUrl: fileInfo.thumbnailUrl
            },
            pages: pages.map(p => ({
                id: p.id,
                name: p.name,
                type: p.type
            })),
            styles: {
                colors: stylesByType.FILL.map(s => ({
                    name: s.name,
                    key: s.key,
                    description: s.description
                })),
                typography: stylesByType.TEXT.map(s => ({
                    name: s.name,
                    key: s.key,
                    description: s.description
                })),
                effects: stylesByType.EFFECT.map(s => ({
                    name: s.name,
                    key: s.key
                }))
            },
            components: componentList.map(c => ({
                name: c.name,
                key: c.key,
                description: c.description,
                componentSetId: c.componentSetId
            })),
            extractedAt: new Date().toISOString()
        };

        // Save the summary
        console.log('💾 Saving design data...');
        fs.writeFileSync('soulprint-design.json', JSON.stringify(summary, null, 2));
        console.log('   ✓ soulprint-design.json\n');

        console.log('='.repeat(50));
        console.log('🚀 Success! Your Figma design data is ready.\n');
        console.log('📊 Summary:');
        console.log(`   • ${pages.length} pages`);
        console.log(`   • ${stylesByType.FILL.length} color styles`);
        console.log(`   • ${stylesByType.TEXT.length} typography styles`);
        console.log(`   • ${componentList.length} components\n`);
        console.log('💡 Next: Share which page/frame you want to build,');
        console.log('   and I\'ll help convert it to a website!');
        console.log('='.repeat(50) + '\n');

        return summary;
    } catch (error) {
        console.error('\n❌ Error:', error.message);

        if (error.message.includes('403')) {
            console.error('\n💡 This is a permissions error. Please check:');
            console.error('   - Your Figma token is valid');
            console.error('   - You have access to view this file');
        } else if (error.message.includes('404')) {
            console.error('\n💡 File not found. Please check:');
            console.error('   - The file URL is correct');
            console.error('   - The file hasn\'t been deleted');
        }

        process.exit(1);
    }
}

// Run the main function
main();

export { fetchFigmaAPI };
