document.getElementById('upload-form').addEventListener('submit', async function (event) {
  event.preventDefault();
  var files = document.getElementById('file-input').files;
  var restrictedNumber = 25;

  // if (files.length < restrictedNumber) {
  //   alert('You need to upload atleast ' + restrictedNumber + ' files.');
  //   return;
  // }
  let data = new FormData();
  for (const single_file of files) {
    data.append('uploadedImages', single_file)
  }

  try {
    const uniqueId = generateUniqueId();
    await fetch(`/api/v1/padim/upload-train-images/${uniqueId}`, {
      method: 'POST',
      body: data
  });
  } catch (error) {
    console.log(error)
  }
});

function generateUniqueId() {
  const timestamp = Date.now().toString(36); // Convert timestamp to base36
  const randomStr = Math.random().toString(36).substring(2, 8); // Generate random string
  const uniqueId = timestamp + randomStr; // Combine timestamp and random string
  return uniqueId;
}