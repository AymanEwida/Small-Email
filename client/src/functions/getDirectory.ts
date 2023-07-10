import { TreeStructure, Optional } from "../types/types";

function checkWindow (): boolean {
    try {
        return window.self === window.top
    } catch {  
        return false;
    }
}

async function openDirectory (mode: string = 'read'): Promise<Optional<TreeStructure>> {
    const supportsFileSystemAccess = 'showDirectoryPicker' in window && checkWindow();

    let directoryStructure: Optional<Promise<TreeStructure>> = undefined;
    
    if (supportsFileSystemAccess) {
        const getFiles = async (directoryHandle: FileSystemDirectoryHandle, path = directoryHandle.name) => {
            const folder: TreeStructure = {
                name: directoryHandle.name,
                childern: [],
            }

            for await (const entry of directoryHandle.values()) {
                const nestedPath = `${path}/${entry.name}`;
                
                if (folder.childern) {
                    if (entry.kind === 'file') {
                        folder.childern.push({ entry:
                            await entry.getFile().then((file) => {
                                Object.defineProperty(file, "directoryHandle", {
                                    value: directoryHandle,
                                });
                                Object.defineProperty(file, "handle", {
                                    value: entry,
                                });
                                return Object.defineProperty(file, "webkitRelativePath", {
                                    configurable: true,
                                    enumerable: true,
                                    get: () => nestedPath,
                                });
                            })
                        });
                    } else if (entry.kind === 'directory') {
                        folder.childern.push({ name: entry.name, childern: ((await getFiles(entry, nestedPath)).childern) });
                    }
                }
            }

            return folder;
        }

        try {
            const dirHandle = await showDirectoryPicker({
                mode,
            });

            directoryStructure = getFiles(dirHandle, undefined);

        } catch (error: any) {
            if (error.name !== "AbortError") {
                console.log(error);
            }
        }
    }

    return directoryStructure;
}

async function getDirectory () {
    const directory = await openDirectory('read');

    if (!directory) {
        return;
    }

    return directory;
}

export { getDirectory };
