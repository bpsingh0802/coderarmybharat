


function formatDoc(cmd, value=null) {
	if(value) {
		document.execCommand(cmd, false, value);
	} else {
		document.execCommand(cmd);
	}
}

function addLink() {
	const url = prompt('Insert url');
	formatDoc('createLink', url);
}




const content = document.getElementById('content');

content.addEventListener('mouseenter', function () {
	const a = content.querySelectorAll('a');
	a.forEach(item=> {
		item.addEventListener('mouseenter', function () {
			content.setAttribute('contenteditable', false);
			item.target = '_blank';
		})
		item.addEventListener('mouseleave', function () {
			content.setAttribute('contenteditable', true);
		})
	})
})


const showCode = document.getElementById('show-code');
let active = false;

showCode.addEventListener('click', function () {
	showCode.dataset.active = !active;
	active = !active
	if(active) {
		content.textContent = content.innerHTML;
		content.setAttribute('contenteditable', false);
	} else {
		content.innerHTML = content.textContent;
		content.setAttribute('contenteditable', true);
	}
})



const filename = document.getElementById('filename');

function fileHandle(value) {
	if(value === 'new') {
		content.innerHTML = '';
		filename.value = 'untitled';
	} else if(value === 'txt') {
		const blob = new Blob([content.innerText])
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a');
		link.href = url;
		link.download = `${filename.value}.txt`;
		link.click();
	} else if(value === 'pdf') {
		html2pdf(content).save(filename.value);
	}
}


const defaultContent = "Lorem, ipsum.";
const defaultTitle = "Your Title";
const defaultImage = "./images/defaultimg.png";
const defaultTag = "all";

let savedContent = defaultContent;
let savedtitle = defaultTitle;



const titleopt = document.getElementById('filename');
const resetButton = document.getElementById('resetButton');
const saveButton = document.getElementById('saveButton');
const previewButton = document.getElementById('previewButton');
const contentDiv = document.getElementById('content');
const tagInput = document.querySelector('input[placeholder="Add tags..."]');
const imagePreview = document.getElementById('imagePreview');
const uploadModal = document.getElementById('uploadModal');
const uploadNewImageButton = document.getElementById('uploadNewImage');
const useDefaultImageButton = document.getElementById('useDefaultImage');
const closeModalButton = document.querySelector('.close');



let isContentSaved = false;
let savedData = JSON.parse(localStorage.getItem('savedData')) || []; // Load existing data from localStorage
let currentImageUrl = defaultImage; 


 // Default image if none selected
 const sanitizedTags = sanitizeInput(tagInput.value || defaultTag); 

// Open the upload modal
document.getElementById('uploadOptionsButton').addEventListener('click', () => {
  uploadModal.style.display = 'block';
});

// Close the modal
closeModalButton.addEventListener('click', () => {
  uploadModal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
  if (event.target === uploadModal) {
    uploadModal.style.display = 'none';
  }
});

// Handle upload new image option
// Handle upload new image option
uploadNewImageButton.addEventListener('click', () => {
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = 'image/*';
	
	input.addEventListener('change', (event) => {
	  const file = event.target.files[0];
	  if (file) {
		const reader = new FileReader();
  
		reader.onload = (e) => {
		  // Display the uploaded image in the preview
		  imagePreview.innerHTML = `
			<img src="${e.target.result}" alt="Uploaded Image" 
			style="max-width: 100%; height: auto; margin-top: 10px; border-radius: 10px; 
			box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);">
		  `;
		  currentImageUrl = e.target.result; // Save the uploaded image URL
		};
  
		reader.onerror = () => {
		  alert('Failed to load image. Please try again.');
		};
  
		reader.readAsDataURL(file); 
	  } else {
		alert('No file selected.');
	  }
	});
  
	input.click(); 
	uploadModal.style.display = 'none'; 
  });
  

// Handle use default image option
useDefaultImageButton.addEventListener('click', () => {
  currentImageUrl = defaultImage;
  imagePreview.innerHTML = `<p style="color: #666;">Default image selected.</p>`;
  uploadModal.style.display = 'none';
});



function sanitizeInput(input) {
  return input.replace(/[^a-zA-Z0-9_\- ]/g, ''); // Allow letters, numbers, underscores, hyphens, and spaces
}

resetButton.addEventListener('click', () => {
  contentDiv.innerHTML = defaultContent;
});




saveButton.addEventListener('click', () => {
  // Get and sanitize title and content
  const sanitizedTitle = sanitizeInput(titleopt.value);
  const sanitizedContent = sanitizeInput(contentDiv.innerHTML);
  const sanitizedTags = sanitizeInput(tagInput.value || defaultTag);

  // Save sanitized content
  savedtitle = sanitizedTitle;
  savedContent = sanitizedContent;

  alert('Content saved!');

  isContentSaved = true;

  const newSave = {
	    title: sanitizedTitle,
	    content: sanitizedContent,
	    tags: sanitizedTags,
	    image: currentImageUrl,
	    timestamp: new Date().toISOString(), 
	  };

  savedData.push(newSave);
  localStorage.setItem('savedData', JSON.stringify(savedData));
 

});


// const defaultTitle = "Your Title";
// const defaultImage = "default-image-url.jpg";
// const defaultTag = "all";

// let savedContent = defaultContent;
// let savedTitle = defaultTitle;

// const titleopt = document.getElementById('filename');
// const resetButton = document.getElementById('resetButton');
// const saveButton = document.getElementById('saveButton');
// const contentDiv = document.getElementById('content');
// const tagInput = document.querySelector('input[placeholder="Add tags..."]');
// const imagePreview = document.getElementById('imagePreview');
// const uploadModal = document.getElementById('uploadModal');
// const uploadNewImageButton = document.getElementById('uploadNewImage');
// const useDefaultImageButton = document.getElementById('useDefaultImage');
// const closeModalButton = document.querySelector('.close');

// let isContentSaved = false;
// let savedData = JSON.parse(localStorage.getItem('savedData')) || []; // Load existing data from localStorage
// let currentImageUrl = defaultImage; // Initialize with default image

// // Function to sanitize input
// function sanitizeInput(input) {
//   return input.replace(/[^a-zA-Z0-9_\- ]/g, ''); // Allow letters, numbers, underscores, hyphens, and spaces
// }



// // Reset button click event
// resetButton.addEventListener('click', () => {
//   contentDiv.innerHTML = defaultContent;
// });

// // Open the upload modal
// document.getElementById('uploadOptionsButton').addEventListener('click', () => {
//   uploadModal.style.display = 'block';
// });

// // Close the modal
// closeModalButton.addEventListener('click', () => {
//   uploadModal.style.display = 'none';
// });

// // Close modal when clicking outside the modal content
// window.addEventListener('click', (event) => {
//   if (event.target === uploadModal) {
//     uploadModal.style.display = 'none';
//   }
// });

// // Handle upload new image option
// // Handle upload new image option
// uploadNewImageButton.addEventListener('click', () => {
// 	const input = document.createElement('input');
// 	input.type = 'file';
// 	input.accept = 'image/*';
	
// 	input.addEventListener('change', (event) => {
// 	  const file = event.target.files[0];
// 	  if (file) {
// 		const reader = new FileReader();
  
// 		reader.onload = (e) => {
// 		  // Display the uploaded image in the preview
// 		  imagePreview.innerHTML = `
// 			<img src="${e.target.result}" alt="Uploaded Image" 
// 			style="max-width: 100%; height: auto; margin-top: 10px; border-radius: 10px; 
// 			box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);">
// 		  `;
// 		  currentImageUrl = e.target.result; // Save the uploaded image URL
// 		};
  
// 		reader.onerror = () => {
// 		  alert('Failed to load image. Please try again.');
// 		};
  
// 		reader.readAsDataURL(file); // Read the image file as a data URL
// 	  } else {
// 		alert('No file selected.');
// 	  }
// 	});
  
// 	input.click(); // Trigger file input dialog
// 	uploadModal.style.display = 'none'; // Close the modal after file selection
//   });
  

// // Handle use default image option
// useDefaultImageButton.addEventListener('click', () => {
//   currentImageUrl = defaultImage;
//   imagePreview.innerHTML = `<p style="color: #666;">Default image selected.</p>`;
//   uploadModal.style.display = 'none';
// });

// // Save button click event
// saveButton.addEventListener('click', () => {
//   const sanitizedTitle = sanitizeInput(titleopt.value || defaultTitle);
//   const sanitizedContent = sanitizeInput(contentDiv.innerHTML || defaultContent);
//   const sanitizedTags = sanitizeInput(tagInput.value || defaultTag);

//   const newSave = {
//     title: sanitizedTitle,
//     content: sanitizedContent,
//     tags: sanitizedTags,
//     image: currentImageUrl, // Use the current image URL
//     timestamp: new Date().toISOString(),
//   };

//   savedData.push(newSave);
//   localStorage.setItem('savedData', JSON.stringify(savedData));

//   alert('Content saved successfully!');
//   isContentSaved = true;

//   console.log('Saved Data:', newSave);
// });












        // Add click event listener to the preview button
        previewButton.addEventListener('click', () => {

			if (!isContentSaved) {
				alert('Please save the content first before previewing!');
				saveContent(); // Automatically save content first
			} else {
				const previewWindow = window.open('', '_blank', 'width=800,height=600');
				previewWindow.document.write(`
				<!DOCTYPE html>
				<html lang="en">
				<head>
				  <meta charset="UTF-8">
				  <meta name="viewport" content="width=device-width, initial-scale=1.0">
				  <title>My Blog</title>
				  <style>
					/* General Styles */
					body {
					  font-family: 'Arial', sans-serif;
					  margin: 0;
					  padding: 0;
					  background-color: #f4f4f9;
					  color: #333;
					}
					a {
					  text-decoration: none;
					  color: inherit;
					}
				
					/* Header and Navbar */
					header {
					  background-color: #007BFF;
					  padding: 20px;
					  text-align: center;
					  color: white;
					}
					nav {
					  background-color: #333;
					  overflow: hidden;
					}
					nav a {
					  float: left;
					  display: block;
					  padding: 14px 20px;
					  color: white;
					  text-align: center;
					  background-color: #333;
					  transition: background-color 0.3s ease;
					}
					nav a:hover {
					  background-color: #575757;
					}
				
					/* Main Content Area */
					.content {
					  max-width: 800px;
					  margin: 20px auto;
					  padding: 20px;
					  background-color: white;
					  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
					  border-radius: 8px;
					}
					.content h1 {
					  font-size: 2.5rem;
					  color: #333;
					}
					.content p {
					  font-size: 1.1rem;
					  line-height: 1.6;
					  color: #555;
					}
				
					/* Footer */
					footer {
					  background-color: #333;
					  color: white;
					  text-align: center;
					  padding: 10px 0;
					  position: fixed;
					  bottom: 0;
					  width: 100%;
					}
				  </style>
				</head>
				<body>
				  <!-- Header Section -->
				  <header>
					<h1>Coder Army  Blog</h1>
					<p>Sharing my thoughts with the world</p>
				  </header>
				
				  <!-- Navbar -->
				  <nav>
					<a href="#home">Home</a>
					<a href="#about">About</a>
					<a href="#blog">Blog</a>
					<a href="#contact">Contact</a>
				  </nav>
				
				  <!-- Content Section -->
				  <div class="content">
					<h1>${savedtitle}</h1>
					<p>${savedContent}</p>
				  </div>
				
				  <!-- Footer -->
				  <footer>
					<p>&copy; 2025 My Blog | All Rights Reserved</p>
				  </footer>
				
				</body>
				</html>
				
				`);
				previewWindow.document.close();
			}

            // Open a new window for the preview
            // Ensure the document is fully loaded
        });

	 window.addEventListener('beforeunload', function (event) {
    if (!isContentSaved) {
      const message = "If you refresh this page, you will lose your data.";
      event.preventDefault();
      event.returnValue = message; // Modern browsers use this property
      return message; // For older browsers
    }
    // If content is saved, no warning
  });
		function blinkBorder() {
			const inputField = document.getElementById('filename');
			
			// Add the blink-border class
			inputField.classList.add('blink-border');
			
			// Remove the blink effect after 5 seconds
			setTimeout(() => {
				inputField.classList.remove('blink-border');
			}, 5000);
		}
	
		window.onload = function() {
			blinkBorder();
		};


		
        const trendingWordsData = {
            words: [
                "AI", "Elections", "World Cup", "Climate Change", "Stock Market",
                "ChatGPT", "Machine Learning", "Mars Mission", "Blockchain", "Cryptocurrency",
                "Olympics", "Virtual Reality", "Space Exploration", "Quantum Computing", 
                "Smartphones", "Metaverse", "Renewable Energy", "Web 3.0", "5G", "Data Privacy"
            ]
        };

        function displayTrendingWords(words) {
            const trendingWordsContainer = document.getElementById('trendingWords');
            const repeatedWords = [...words, ...words]; // Duplicate the list for smooth scrolling

            repeatedWords.forEach(word => {
                const wordItem = document.createElement('div');
                wordItem.classList.add('trending-word');
                wordItem.textContent = word;
                trendingWordsContainer.appendChild(wordItem);
            });
        }

        displayTrendingWords(trendingWordsData.words);


		const contentDiv2 = document.getElementById("content");

		contentDiv2.addEventListener("paste", (event) => {
    event.preventDefault();
    const text = (event.clipboardData || window.clipboardData).getData("text");
    document.execCommand("insertText", false, text);
});


document.addEventListener("DOMContentLoaded", function () {
	const darkModeToggle = document.getElementById("darkModeToggle");
	darkModeToggle.addEventListener("click", function () {
	  document.body.classList.toggle("dark-mode");
	});
  });

  document.addEventListener("DOMContentLoaded", function () {
    const toolsLink = document.querySelector(".tools-link");
    const dropdownLi = toolsLink.parentElement;

    toolsLink.addEventListener("click", function (e) {
      e.preventDefault(); 
      dropdownLi.classList.toggle("show"); // Toggle the 'show' class
    });

   
    document.addEventListener("click", function (e) {
      if (!dropdownLi.contains(e.target)) {
        dropdownLi.classList.remove("show"); 
      }
    });
  });





const postContainer = document.getElementById('postContainer');

        if (Array.isArray(savedData) && savedData.length > 0) {
            savedData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

            savedData.forEach((item, index) => {
                const container = document.createElement('div');
                container.classList.add('post-box', 'tech');
                container.style.display = "flex";

                container.innerHTML = `
                    <div class="post-options">
                        <button class="btn-update" data-index="${index}">Update</button>
                        <button class="btn-delete" data-index="${index}">Delete</button>
                    </div>
                    <div class="post-content">
                        <a href="#" class="post-title">${item.title}</a>
						<h2 class="category">${item.tags}</h2>

                        <p class="post-description">${item.content}</p>
						<span class="post-date">${new Date(item.timestamp).toLocaleDateString()}</span>
						


                    </div>
                `;

                postContainer.appendChild(container);
            });
        }

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-delete')) {
                const index = e.target.getAttribute('data-index');
                savedData.splice(index, 1);
                localStorage.setItem('savedData', JSON.stringify(savedData));
                location.reload();
            } else if (e.target.classList.contains('btn-update')) {
                const index = e.target.getAttribute('data-index');
                const updatedContent = prompt("Enter new content:", savedData[index]?.content);
                if (updatedContent) {
                    savedData[index].content = updatedContent;
                    localStorage.setItem('savedData', JSON.stringify(savedData));
                    location.reload();
                }
            }
        });




		document.getElementById('publishButton').addEventListener('click', function () {
			if (!isContentSaved) {
				alert('Please save the content before publishing!');
				return; 
			}
		
			// Show the success message and progress bar
			const message = document.getElementById('message');
			const progressContainer = document.getElementById('progressContainer');
			const progressBar = document.getElementById('progressBar');
			message.style.display = 'block';
			progressContainer.style.display = 'block';
		
			// Animate the progress bar
			let width = 0;
			const interval = setInterval(function () {
				if (width >= 100) {
					clearInterval(interval);
					// Redirect to index.html after progress bar reaches 100%
					window.location.href = 'index.html';
				} else {
					width++;
					progressBar.style.width = width + '%';
				}
			}, 20); 
		});
		
		
		
		
		



		const noteInput = document.getElementById('noteInput');
        const notesContainer = document.getElementById('notesContainer');

        function loadNotes() {
            const notes = JSON.parse(sessionStorage.getItem('quickNotes')) || [];
            notesContainer.innerHTML = '';
            notes.forEach(note => {
                const noteDiv = document.createElement('div');
                noteDiv.className = 'note';
                noteDiv.textContent = note;
                notesContainer.appendChild(noteDiv);
            });
        }

        document.getElementById('saveNote').addEventListener('click', () => {
            const note = noteInput.value.trim();
            if (note) {
                const notes = JSON.parse(sessionStorage.getItem('quickNotes')) || [];
                notes.push(note);
                sessionStorage.setItem('quickNotes', JSON.stringify(notes));
                noteInput.value = '';
                loadNotes();
            }
        });

        // Clear notes and refresh
        document.getElementById('clearNotes').addEventListener('click', () => {
            sessionStorage.removeItem('quickNotes');
            notesContainer.innerHTML = '';
        });

        loadNotes();
	
		
	
		