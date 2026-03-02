import fs from 'fs/promises'
import path from 'path'

const STORAGE_BASE = path.join(process.cwd(), 'public', 'storage', 'uploads')

export class LocalStorage {
    static async saveFile(
        directory: string,
        fileId: string,
        file: Buffer,
        extension: string,
    ): Promise<string> {
        const dir = path.join(STORAGE_BASE, directory, fileId)
        await fs.mkdir(dir, { recursive: true })

        const filename = `file${extension}`
        const filepath = path.join(dir, filename)
        await fs.writeFile(filepath, file)

        return `/storage/uploads/${directory}/${fileId}/${filename}`
    }

    static async readFile(publicUrl: string): Promise<Buffer> {
        const relativePath = publicUrl.replace('/storage/uploads/', '')
        const filepath = path.join(STORAGE_BASE, relativePath)
        return await fs.readFile(filepath)
    }

    static async deleteDirectory(directory: string, fileId: string): Promise<void> {
        const dir = path.join(STORAGE_BASE, directory, fileId)
        await fs.rm(dir, { recursive: true, force: true })
    }
}
