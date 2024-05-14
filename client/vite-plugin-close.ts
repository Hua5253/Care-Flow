import { Plugin } from 'vite';

export default function VitePluginClose(): Plugin {
    return {
        name: 'VitePluginClose',
        buildEnd(error) {
            if (error) {
                console.error('Error bundling');
                console.error(error);
                process.exit(1);
            } else {
                console.log('Build Ended');
            }
        },
        closeBundle() {
            console.log('Bundle Closed');
            process.exit(0);
        }

    }
}