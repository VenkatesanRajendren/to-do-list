document.addEventListener("DOMContentLoaded", () => {
    const editBtn = document.querySelectorAll('.edit-form-btn');
    console.log(editBtn);
    editBtn.forEach( btn => btn.addEventListener('click', showEditOption) );
});

function showEditOption(event)
{
    const btn = event.target;
    const container = btn.closest('.items');
    const updateForm = container.querySelector(".update-form-section");
    console.log(container.children);
    Array.from(container.children).forEach( e => e.classList.add("hide"));
    updateForm.classList.remove("hide");
}