function getFile(pai) {
    const inputFile = pai.children[1];
    const miniLabel = pai.children[2];

    inputFile.addEventListener('change', function () {
        let nomeArquivo = '';
        if (inputFile.files.length > 0) {
            nomeArquivo = inputFile.files[0].name;
        }

        // remove a extensao do arquivo(replace)
        miniLabel.innerHTML = nomeArquivo.replace(/\.[^/.]+$/, "");
    })
}