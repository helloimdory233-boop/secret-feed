'use client';
import { db } from './firebase';
import { collection, addDoc, getDocs, orderBy, query, doc, getDoc, updateDoc, increment } from 'firebase/firestore';

const postsRef = collection(db, 'posts');

export async function getPosts(){
  try{
    const q = query(postsRef, orderBy('ts','desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d=> ({id:d.id, ...d.data()})) as any[];
  }catch(e){
    // fallback: localStorage demo
    if (typeof window !== 'undefined'){
      const local = JSON.parse(localStorage.getItem('sf_posts_v1')||'[]');
      return local;
    }
    return [];
  }
}

export async function createPost({title, body}:{title:string; body:string}){
  const post = { title, body, ts: Date.now(), fire:0, susp:0, comments:0 };
  try{
    await addDoc(postsRef, post);
    return true;
  }catch(e){
    // fallback local demo
    if (typeof window !== 'undefined'){
      const local = JSON.parse(localStorage.getItem('sf_posts_v1')||'[]');
      local.push({ id: Math.random().toString(36).slice(2,8), ...post });
      localStorage.setItem('sf_posts_v1', JSON.stringify(local));
    }
    return false;
  }
}

export async function getPostById(id:string){
  try{
    const d = await getDoc(doc(db,'posts', id));
    if(d.exists()) return {id:d.id, ...d.data()};
  }catch(e){}
  // fallback
  if (typeof window !== 'undefined'){
    const local = JSON.parse(localStorage.getItem('sf_posts_v1')||'[]');
    return local.find((p:any)=>p.id===id) || null;
  }
  return null;
}

export async function reactToPost(id:string, type:'fire'|'susp'){
  try{
    await updateDoc(doc(db,'posts', id), {[type]: increment(1)});
    return true;
  }catch(e){
    if (typeof window !== 'undefined'){
      const local = JSON.parse(localStorage.getItem('sf_posts_v1')||'[]');
      const i = local.findIndex((p:any)=>p.id===id);
      if(i>-1){ local[i][type]=(local[i][type]||0)+1; localStorage.setItem('sf_posts_v1', JSON.stringify(local)); }
    }
    return false;
  }
}