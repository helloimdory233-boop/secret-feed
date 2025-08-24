'use client';
import { useEffect, useState } from 'react';
import { getPostById } from '../../lib/data';

export default function Post({params}:{params:{id:string}}){
  const [post, setPost] = useState<any>(null);
  useEffect(()=>{ getPostById(params.id).then(setPost); },[params.id]);
  if(!post) return <div>Yükleniyor...</div>;
  return (
    <article className="card">
      <div className="meta"><span className="badge">Anonim</span><time>{new Date(post.ts).toLocaleString()}</time></div>
      <h2 className="title">{post.title}</h2>
      <p className="body">{post.body}</p>
    </article>
  );
}