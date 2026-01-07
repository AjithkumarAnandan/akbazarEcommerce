 export function fileToBinaryArray(file: any) {
       return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            // console.log("file", reader)
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
        });
    }
