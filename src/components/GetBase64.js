export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    console.log("file", file);
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => resolve(reader.result)

    reader.onerror = (error) => reject(error)
  })