'use client';
import { useEffect, useState } from 'react';
import { getPosts, reactToPost } from './lib/data';
import Link from 'next/link';

type Post = { id:string; title:string; body:string; ts:number; fire?:number; susp?:number; comments?:number; };

export default function Home(){
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(()=>{ getPosts().then(setPosts); },[]);

  const onReact = async (id:string, type:'fire'|'susp')=>{
    await reactToPost(id, type);
    setPosts(await getPosts());
  };

  return (
    <div>
      {posts.map(p=> (
        <article className="card" key={p.id}>
          <div className="meta"><span className="badge">Anonim</span><time>{new Date(p.ts).toLocaleString()}</time></div>
          <h2 className="title">{p.title}</h2>
          <p className="body">{p.body}</p>
          <div className="reactions">
            <button onClick={()=>onReact(p.id,'fire')}>🔥 {p.fire||0}</button>
            <button onClick={()=>onReact(p.id,'susp')}>🤔 {p.susp||0}</button>
            <Link href={`/post/${p.id}`}>💬 {p.comments||0} yorum</Link>
          </div>
        </article>
      ))}
    </div>
  )
}