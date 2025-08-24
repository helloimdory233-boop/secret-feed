'use client';
import { useRouter } from 'next/navigation';
import { createPost } from '../lib/data';
import { useState } from 'react';

export default function Submit(){
  const router = useRouter();
  const [title,setTitle]=useState('');
  const [body,setBody]=useState('');

  async function onSubmit(e:React.FormEvent){
    e.preventDefault();
    if(!title.trim()||!body.trim()) return;
    await createPost({title, body});
    router.push('/');
  }

  return (
    <section>
      <h1>Yeni Gönderi</h1>
      <form className="form" onSubmit={onSubmit}>
        <label>Başlık</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Skandal başlık..." />
        <label>Dedikodu / Hikâye</label>
        <textarea rows={6} value={body} onChange={e=>setBody(e.target.value)} placeholder="Anlat bakalım..." />
        <button className="cta" type="submit">Yayınla</button>
        <p className="hint">Anonim takma ad otomatik atanır (Guest-###).</p>
      </form>
    </section>
  )
}