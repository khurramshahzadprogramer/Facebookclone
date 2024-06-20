document.addEventListener('DOMContentLoaded', function() {
    const postForm = document.getElementById('postForm');
    const postsContainer = document.querySelector('.posts');
    const profileForm = document.getElementById('profileForm');

    postForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const postContent = document.getElementById('postContent').value;

        if (postContent) {
            const newPostId = `commentSection${postsContainer.children.length + 1}`;
            const newPost = document.createElement('div');
            newPost.className = 'post';
            newPost.innerHTML = `
                <h5>User's Post</h5>
                <p>${postContent}</p>
                <button class="btn btn-light btn-sm like-btn">Like <span class="badge badge-light">0</span></button>
                <button class="btn btn-light btn-sm" data-toggle="collapse" data-target="#${newPostId}">Comment</button>
                <button class="btn btn-light btn-sm edit-btn">Edit</button>
                <button class="btn btn-light btn-sm delete-btn">Delete</button>
                <div id="${newPostId}" class="collapse">
                    <div class="comments">
                        <input type="text" class="form-control comment-input" placeholder="Write a comment...">
                        <div class="comment-list"></div>
                    </div>
                </div>
            `;

            postsContainer.insertBefore(newPost, postsContainer.firstChild);

            postForm.reset();
            $('#createPostModal').modal('hide');
        }
    });

    postsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('like-btn')) {
            const likeBadge = event.target.querySelector('.badge');
            likeBadge.textContent = parseInt(likeBadge.textContent) + 1;
        }

        if (event.target.classList.contains('edit-btn')) {
            const post = event.target.closest('.post');
            const postContent = post.querySelector('p');
            const newContent = prompt('Edit your post:', postContent.textContent);
            if (newContent) {
                postContent.textContent = newContent;
            }
        }

        if (event.target.classList.contains('delete-btn')) {
            if (confirm('Are you sure you want to delete this post?')) {
                event.target.closest('.post').remove();
            }
        }

        if (event.target.classList.contains('comment-input')) {
            if (event.key === 'Enter' && event.target.value.trim()) {
                const commentList = event.target.nextElementSibling;
                const newComment = document.createElement('div');
                newComment.textContent = event.target.value;
                commentList.appendChild(newComment);
                event.target.value = '';
            }
        }
    });

    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('profileUsername').value;
        const email = document.getElementById('profileEmail').value;

        document.querySelector('.profile-info strong').textContent = username;
        document.querySelector('.profile-info p').textContent = email;

        $('#editProfileModal').modal('hide');
    });

    const friendRequests = document.querySelectorAll('.accept-btn, .decline-btn');
    friendRequests.forEach(button => {
        button.addEventListener('click', function(event) {
            const request = event.target.closest('.list-group-item');
            if (event.target.classList.contains('accept-btn')) {
                alert('Friend request accepted.');
            } else {
                alert('Friend request declined.');
            }
            request.remove();
        });
    });
});
