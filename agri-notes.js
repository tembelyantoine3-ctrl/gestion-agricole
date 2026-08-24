const $=id=>document.getElementById(id),KEY='notes_agri_pro';
let notes=JSON.parse(localStorage.getItem(KEY)||'[]');
const safe=s=>String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':
    '&gt;','"':'&quot;',"'":'&#39;'}[m]));function save(){localStorage.setItem(KEY,
JSON.stringify(notes))}function clear(){ $('noteForm').reset();$('noteId').value='';
$('noteSubmit').textContent='Ajouter la note';
$('cancelEdit').classList.add('d-none')}
function render(){let box=$('notesList');
$('notesCount').textContent=notes.length+' note'+(notes.length>1?'s':'');
box.innerHTML=notes.length?[...notes].sort((a,b)=>+b.urgent-+a.urgent||b.created-a.created).map(n=>`<article class="note-item 
${n.urgent?'urgent':''}"><div class="d-flex justify-content-between align-items-start"><div><strong>
${safe(n.title)} ${n.urgent?'<span class="badge badge-warning ml-1">Urgente</span>':''}
</strong><small class="d-block text-muted mt-1">${new Date(n.created).toLocaleString
('fr-FR')}</small></div><div class="ml-3 text-nowrap"><button class="btn btn-sm btn-outline-success" onclick="editNote('${n.id}')">Modifier
</button><button class="btn btn-sm btn-outline-danger" onclick="delNote('${n.id}')">×</button></div></div>
${n.text?'<p class="mb-0 mt-3 text-muted">'+safe(n.text).replace(/\n/g,'<br>')+'</p>':''}</article>`).join(''):'<p class="empty">Aucune note. Créez votre premier brouillon à gauche.</p>'}
function editNote(id){let n=notes.find(n=>n.id===id);$('noteId').value=n.id;
$('noteTitle').value=n.title;$('noteText').value=n.text||'';$('noteUrgent').checked=!!n.urgent;
$('noteSubmit').textContent='Mettre à jour';
$('cancelEdit').classList.remove('d-none');
window.scrollTo({top:0,behavior:'smooth'})}
function delNote(id){if(confirm('Supprimer cette note ?'))
{notes=notes.filter(n=>n.id!==id);save();
render()}}$('noteForm').onsubmit=e=>{e.preventDefault();
let id=$('noteId').value,entry={id:id||Date.now().toString(36),title:$('noteTitle').value.trim(),
text:$('noteText').value.trim(),urgent:$('noteUrgent').checked,created:Date.now()};
notes=id?notes.map(n=>n.id===id?{...n,...entry}:n):[entry,...notes];
save();clear();render()};$('cancelEdit').onclick=clear;render();
window.addEventListener('load',()=>{const n=document.querySelector('nav');if(n)n.insertAdjacentHTML('beforeend','<button class="btn btn-sm btn-light ml-2" onclick="window.print()">Imprimer</button><a class="btn btn-sm btn-warning ml-1" href="corbeille_agri.html">Corbeille</a>')});
window.addEventListener('load',()=>{const n=document.querySelector('nav');if(n)n.insertAdjacentHTML('afterbegin','<a class="nav-link-app" href="index.html">Accueil</a>')});
