export function URLToPublicId(URL:string){
    const parts = URL.split('/');
    const uploadIndex = parts.indexOf('upload');
    const relevantPath = parts.slice(uploadIndex+2);
    const pathWithExtension = relevantPath.join('/');
    const PublicId = pathWithExtension.substring(0,pathWithExtension.lastIndexOf('.'));

    return PublicId
}