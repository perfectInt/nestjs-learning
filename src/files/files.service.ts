import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from "path";
import * as uuid from "uuid";
import * as fs from "fs";

@Injectable()
export class FilesService {

  async createFile(file): Promise<string> {
    try {
      const filename = uuid.v4() + ".jpg";
      const filepath = path.resolve(__dirname, "..", "static");
      if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath, { recursive: true });
      }
      fs.writeFileSync(path.join(filepath, filename), file.buffer);
      return filename;
    } catch (e) {
      throw new HttpException("Could not upload file", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
