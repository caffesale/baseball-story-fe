interface ImageFile {
    uri: string;
    name: string;
    type: string;
}

type WebImageFile = File;

type StoryImage = ImageFile | WebImageFile;

export { ImageFile, StoryImage, WebImageFile };
