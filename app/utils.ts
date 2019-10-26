export function downloadFile(filename: string, blob) {
    // create blob link
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);

    // append to html
    document.body.appendChild(link);

    // download
    link.click();

    // remove
    link.parentNode.removeChild(link);
}
