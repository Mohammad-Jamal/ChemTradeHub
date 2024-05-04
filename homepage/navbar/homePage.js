const toggle_btn = document.getElementById('checkbox')
const searchBar = document.getElementById("search")
console.log(toggle_btn);

toggle_btn.addEventListener('change' , () => {
  if(toggle_btn.checked)
    {
      console.log(`checked`);
      document.body.classList.add('dark-mode');
      searchBar.style.backgroundColor = '#f2f2f2';
    } else {
      console.log(`unchecked`);
      document.body.classList.remove('dark-mode');
    }
})