(function(){
  const demoPostsKey = "sf_posts_v1";
  function uid(){ return Math.random().toString(36).slice(2,8); }
  function nowISO(){ return new Date().toISOString(); }
  function loadPosts(){ try{ return JSON.parse(localStorage.getItem(demoPostsKey))||[] }catch(e){ return [] } }
  function savePosts(posts){ localStorage.setItem(demoPostsKey, JSON.stringify(posts)); }
  function seed(){
    const posts = loadPosts();
    if(posts.length===0){
      savePosts([
        {id:uid(), title:"Okulun en büyük sırrı ortaya çıktı!", body:"Detaylar çok karışık ama kaynak sağlam 🙊", ts:nowISO(), fire:2, susp:1, comments:0},
        {id:uid(), title:"Yeni bir çift görüldü...", body:"Kafede el ele… İsimler yakında 😉", ts:nowISO(), fire:5, susp:3, comments:2}
      ]);
    }
  }
  function formatTime(iso){ try{ return new Date(iso).toLocaleString(); }catch(e){ return iso; } }
  function renderFeed(){
    const feed = document.getElementById("feed"); if(!feed) return;
    const posts = loadPosts().sort((a,b)=> new Date(b.ts)-new Date(a.ts));
    feed.innerHTML=""; const tpl = document.getElementById("post-card");
    posts.forEach(p=>{
      const node = tpl.content.cloneNode(true);
      node.querySelector(".title").textContent = p.title;
      node.querySelector(".body").textContent = p.body;
      node.querySelector("time").textContent = formatTime(p.ts);
      const fireBtn = node.querySelector("[data-r='fire']");
      const suspBtn = node.querySelector("[data-r='susp']");
      fireBtn.querySelector("span").textContent = p.fire||0;
      suspBtn.querySelector("span").textContent = p.susp||0;
      node.querySelector(".comments-link").textContent = `💬 ${p.comments||0} yorum`;
      fireBtn.addEventListener("click", ()=>{ p.fire=(p.fire||0)+1; bump(p); });
      suspBtn.addEventListener("click", ()=>{ p.susp=(p.susp||0)+1; bump(p); });
      feed.appendChild(node);
    });
    function bump(p){
      const all = loadPosts(); const i = all.findIndex(x=>x.id===p.id);
      if(i>-1){ all[i]=p; savePosts(all); renderFeed(); }
    }
  }
  function handleSubmit(){
    const form = document.getElementById("post-form"); if(!form) return;
    form.addEventListener("submit", function(e){
      e.preventDefault();
      const title = document.getElementById("title").value.trim();
      const body = document.getElementById("body").value.trim();
      if(!title||!body) return;
      const posts = loadPosts();
      posts.push({id:uid(), title, body, ts:nowISO(), fire:0, susp:0, comments:0});
      savePosts(posts); window.location.href="index.html";
    });
  }
  seed(); renderFeed(); handleSubmit();
})();