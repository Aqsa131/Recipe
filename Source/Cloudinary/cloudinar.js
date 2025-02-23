const uploadImage = async () => {
    const selectedImage = document.getElementById('profileImageUpload').files[0];
    const cloudName = 'dd0hhsmim';
    const presetName = 'firebaseXcloudinary';

    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", presetName);

    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        console.log('Uploaded:', data);
        // document.getElementById("uploaded-image").src = data.secure_url;

    } catch (error) {
        console.error('Upload Error:', error);
    }
};

document.getElementById('uploadImage')?.addEventListener('click', uploadImage);
