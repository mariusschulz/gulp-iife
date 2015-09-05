import through from "through2";
import iife from "./iife";

export default function gulpIife(userOptions) {
    return through.obj(function(file, encoding, callback) {
        const contents = String(file.contents);
        const wrappedContents = iife.surround(contents, userOptions);

        file.contents = Buffer(wrappedContents);

        callback(null, file);
    });
}
