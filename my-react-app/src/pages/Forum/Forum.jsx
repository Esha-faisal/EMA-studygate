import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarDashboard from '../../components/dashboard/NavbarDashboard';
import Sidebar from '../../components/dashboard/Sidebar';
import './Forum.css';

import axios from "axios";


import {
  Globe,
  Stamp,
  Landmark,
  BadgeDollarSign,
  FileText,
  Home,
  MessageCircle,
  Edit3,
  Users,
  Flame,
  CheckCircle,
  Pin,
  Clock,
  Search,
  X,
  Heart,
  Eye,
  Send,
  Rocket,
  ChevronLeft,
  MessageSquare,
} from 'lucide-react';

/* ── Mock Data ── */
const categories = [
  { id: 'all',          label: 'All Topics',        icon: <Globe size={16} /> },
  { id: 'visa',         label: 'Visa & Immigration', icon: <Stamp size={16} /> },
  { id: 'universities', label: 'Universities',       icon: <Landmark size={16} /> },
  { id: 'scholarships', label: 'Scholarships',       icon: <BadgeDollarSign size={16} /> },
  { id: 'ielts',        label: 'IELTS / Tests',      icon: <FileText size={16} /> },
  { id: 'housing',      label: 'Housing & Life',     icon: <Home size={16} /> },
  { id: 'general',      label: 'General',            icon: <MessageCircle size={16} /> },
];

const mockPosts = [
  {
    id: 1,
    category: 'visa',
    title: 'Canada Student Visa — How long did your processing take?',
    body: 'I applied for my Canadian study permit 8 weeks ago and still waiting. Has anyone else experienced this? My program starts in September and I am getting worried.',
    author: 'Ahmed_Karachi',
    avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Ahmed',
    time: '2 hours ago',
    likes: 24,
    replies: [
      { id: 1, author: 'Sara_Lahore', avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Sara', text: 'Mine took 11 weeks but I got it eventually. Keep checking your IRCC portal!', time: '1 hour ago', likes: 8 },
      { id: 2, author: 'Bilal_ISB',   avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Bilal', text: 'I would recommend submitting a webform inquiry if it crosses 12 weeks.', time: '45 min ago', likes: 5 },
    ],
    pinned: true,
    views: 312,
  },
  {
    id: 2,
    category: 'scholarships',
    title: 'Chevening 2025-26 — Application tips from a winner',
    body: 'I was awarded the Chevening Scholarship this year. Happy to share what worked for me in the essays and interview. Ask me anything!',
    author: 'Fatima_UK',
    avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Fatima',
    time: '5 hours ago',
    likes: 87,
    replies: [
      { id: 1, author: 'Usman_PK', avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Usman', text: 'Congratulations! How did you structure your leadership essay?', time: '4 hours ago', likes: 12 },
      { id: 2, author: 'Hina_LHR', avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Hina', text: 'Did you have work experience before applying?', time: '3 hours ago', likes: 7 },
    ],
    pinned: true,
    views: 891,
  },
  {
    id: 3,
    category: 'ielts',
    title: 'IELTS Writing Task 2 — How to score 7+ band?',
    body: 'I have been struggling with Writing Task 2. Currently scoring 6.0. Any tips on improving coherence and vocabulary?',
    author: 'Zara_FSD',
    avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Zara',
    time: '1 day ago',
    likes: 45,
    replies: [
      { id: 1, author: 'Ali_Tutor', avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=AliT', text: 'Focus on topic sentences for each paragraph and use linking words consistently.', time: '20 hours ago', likes: 19 },
    ],
    pinned: false,
    views: 456,
  },
  {
    id: 4,
    category: 'universities',
    title: 'University of Toronto vs McGill — Which is better for CS?',
    body: 'I have received offers from both UofT and McGill for Computer Science. Looking for insights from current students or alumni. Factors: research, industry connections, city life.',
    author: 'Hassan_KHI',
    avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Hassan',
    time: '2 days ago',
    likes: 63,
    replies: [
      { id: 1, author: 'Mariam_CA', avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Mariam', text: 'UofT has stronger industry ties in Toronto tech scene. McGill is great for research.', time: '1 day ago', likes: 22 },
      { id: 2, author: 'Omar_MTL', avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Omar', text: 'Montreal is much more affordable than Toronto. Consider living costs too!', time: '1 day ago', likes: 18 },
    ],
    pinned: false,
    views: 724,
  },
  {
    id: 5,
    category: 'housing',
    title: 'Finding student accommodation in London — My experience',
    body: 'Just moved to London for my Masters. Here is everything I wish I had known about finding housing before arriving. Sharing my checklist and trusted websites.',
    author: 'Nadia_London',
    avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Nadia',
    time: '3 days ago',
    likes: 38,
    replies: [],
    pinned: false,
    views: 289,
  },
  {
    id: 6,
    category: 'general',
    title: 'How do you manage homesickness while studying abroad?',
    body: 'First month abroad and really struggling with missing home. Would love to hear how others cope with this.',
    author: 'Sana_AUS',
    avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Sana',
    time: '4 days ago',
    likes: 92,
    replies: [
      { id: 1, author: 'Kamran_DE', avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=Kamran', text: 'Join Pakistani student societies at your university. Made a huge difference for me.', time: '3 days ago', likes: 31 },
    ],
    pinned: false,
    views: 1023,
  },
];

const Forum = () => {
const [user, setUser] = useState(null);

useEffect(() => {
  axios.get("http://localhost:5000/api/students/profile", {
    headers: {
      Authorization: localStorage.getItem("token")
    }
  })
  .then(res => {
    setUser(res.data);
  })
  .catch(err => {
    console.log(err);
  });
}, []);

  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch]                 = useState('');
  const [openPost, setOpenPost]             = useState(null);
  const [showNewPost, setShowNewPost]       = useState(false);
  const [posts, setPosts]                   = useState(mockPosts);
  const [likedPosts, setLikedPosts]         = useState([]);
  const [replyText, setReplyText]           = useState('');
  const [newPost, setNewPost]               = useState({ title: '', body: '', category: 'general' });

  /* ── Filtered posts ── */
  const filtered = posts.filter(p => {
    const matchCat    = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                        p.body.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const pinnedPosts  = filtered.filter(p => p.pinned);
  const regularPosts = filtered.filter(p => !p.pinned);

  /* ── Handlers ── */
  const toggleLike = (id) => {
    setLikedPosts(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
    setPosts(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, likes: likedPosts.includes(id) ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const submitReply = (postId) => {
    if (!replyText.trim()) return;
    const newReply = {
      id: Date.now(),
     author: user?.fullName,
avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${user?.fullName}`,
      text: replyText.trim(),
      time: 'Just now',
      likes: 0,
    };
    setPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? { ...p, replies: [...p.replies, newReply] }
          : p
      )
    );
    setReplyText('');
    setOpenPost(prev =>
      prev && prev.id === postId
        ? { ...prev, replies: [...prev.replies, newReply] }
        : prev
    );
  };

  const submitNewPost = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.body.trim()) return;
    const post = {
      id: Date.now(),
      ...newPost,
    author: user?.fullName,
    avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${user?.fullName}`,
      time: 'Just now',
      likes: 0,
      replies: [],
      pinned: false,
      views: 1,
    };
    setPosts(prev => [post, ...prev]);
    setNewPost({ title: '', body: '', category: 'general' });
    setShowNewPost(false);
  };

  const getCategoryConfig = (id) => categories.find(c => c.id === id) || categories[0];

  return (
    <div className="forum-root">
      <NavbarDashboard />
      <div className="forum-body">
        <Sidebar />

        <main className="forum-main">

          {/* ── Header ── */}
          <div className="forum-header">
            <div>
              <h1 className="forum-header__title">Peer Forums</h1>
              <p className="forum-header__sub">Connect, share experiences, and get advice from fellow students</p>
            </div>
            <button className="forum-new-btn" onClick={() => setShowNewPost(true)}>
              <Edit3 size={15} style={{ marginRight: 6 }} />
              New Post
            </button>
          </div>

          {/* ── Stats ── */}
          <div className="forum-stats">
            {[
              { icon: <MessageCircle size={20} />, label: 'Total Posts',    val: posts.length },
              { icon: <Users size={20} />,         label: 'Active Members', val: '1,240' },
              { icon: <Flame size={20} />,         label: 'Posts Today',    val: '18' },
              { icon: <CheckCircle size={20} />,   label: 'Answers Given',  val: '3,892' },
            ].map(s => (
              <div key={s.label} className="forum-stat">
                <span className="forum-stat__icon">{s.icon}</span>
                <div>
                  <p className="forum-stat__val">{s.val}</p>
                  <p className="forum-stat__label">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="forum-layout">

            {/* ── Left: Category Sidebar ── */}
            <aside className="forum-cats">
              <p className="forum-cats__title">Categories</p>
              {categories.map(c => (
                <button
                  key={c.id}
                  className={`forum-cat-btn${activeCategory === c.id ? ' forum-cat-btn--active' : ''}`}
                  onClick={() => setActiveCategory(c.id)}
                >
                  <span>{c.icon}</span>
                  <span>{c.label}</span>
                  <span className="forum-cat-btn__count">
                    {c.id === 'all' ? posts.length : posts.filter(p => p.category === c.id).length}
                  </span>
                </button>
              ))}
            </aside>

            {/* ── Right: Posts ── */}
            <div className="forum-content">

              {/* Search */}
              <div className="forum-search">
                <Search size={16} />
                <input
                  placeholder="Search discussions..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {search && (
                  <button className="forum-search__clear" onClick={() => setSearch('')}>
                    <X size={14} />
                  </button>
                )}
              </div>

              {filtered.length === 0 && (
                <div className="forum-empty">
                  <MessageCircle size={40} />
                  <p>No posts found. Be the first to start a discussion!</p>
                  <button className="forum-new-btn" onClick={() => setShowNewPost(true)}>
                    <Edit3 size={14} style={{ marginRight: 6 }} /> Create Post
                  </button>
                </div>
              )}

              {/* Pinned Posts */}
              {pinnedPosts.length > 0 && (
                <div className="forum-section">
                  <p className="forum-section__label">
                    <Pin size={14} style={{ marginRight: 5 }} /> Pinned
                  </p>
                  {pinnedPosts.map(post => (
                    <PostCard
                      key={post.id}
                      post={post}
                      liked={likedPosts.includes(post.id)}
                      onLike={() => toggleLike(post.id)}
                      onOpen={() => setOpenPost(post)}
                      getCategoryConfig={getCategoryConfig}
                    />
                  ))}
                </div>
              )}

              {/* Regular Posts */}
              {regularPosts.length > 0 && (
                <div className="forum-section">
                  {pinnedPosts.length > 0 && (
                    <p className="forum-section__label">
                      <Clock size={14} style={{ marginRight: 5 }} /> Recent
                    </p>
                  )}
                  {regularPosts.map(post => (
                    <PostCard
                      key={post.id}
                      post={post}
                      liked={likedPosts.includes(post.id)}
                      onLike={() => toggleLike(post.id)}
                      onOpen={() => setOpenPost(post)}
                      getCategoryConfig={getCategoryConfig}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* ── Post Detail Modal ── */}
      {openPost && (
        <div className="forum-modal-overlay" onClick={() => setOpenPost(null)}>
          <div className="forum-modal" onClick={e => e.stopPropagation()}>
            <div className="forum-modal__header">
              <button className="forum-modal__back" onClick={() => setOpenPost(null)}>
                <ChevronLeft size={16} style={{ marginRight: 4 }} /> Back
              </button>
              <button className="forum-modal__close" onClick={() => setOpenPost(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="forum-modal__body">
              {/* Original Post */}
              <div className="forum-modal__post">
                <div className="forum-modal__post-top">
                  <img src={openPost.avatar} alt={openPost.author} className="forum-avatar forum-avatar--lg" />
                  <div>
                    <p className="forum-modal__author">{openPost.author}</p>
                    <p className="forum-modal__time">{openPost.time}</p>
                  </div>
                  <span className={`forum-cat-tag forum-cat-tag--${openPost.category}`}>
                    {getCategoryConfig(openPost.category).icon}
                    <span style={{ marginLeft: 4 }}>{getCategoryConfig(openPost.category).label}</span>
                  </span>
                </div>
                <h2 className="forum-modal__title">{openPost.title}</h2>
                <p className="forum-modal__body-text">{openPost.body}</p>
                <div className="forum-modal__post-actions">
                  <button
                    className={`forum-like-btn${likedPosts.includes(openPost.id) ? ' forum-like-btn--active' : ''}`}
                    onClick={() => toggleLike(openPost.id)}
                  >
                    <Heart
                      size={15}
                      style={{ marginRight: 4 }}
                      fill={likedPosts.includes(openPost.id) ? 'currentColor' : 'none'}
                    />
                    {openPost.likes}
                  </button>
                  <span className="forum-modal__views">
                    <Eye size={14} style={{ marginRight: 4 }} />
                    {openPost.views} views
                  </span>
                </div>
              </div>

              {/* Replies */}
              <div className="forum-modal__replies">
                <p className="forum-modal__replies-title">
                  <MessageSquare size={15} style={{ marginRight: 6 }} />
                  {openPost.replies.length} {openPost.replies.length === 1 ? 'Reply' : 'Replies'}
                </p>

                {openPost.replies.length === 0 && (
                  <p className="forum-modal__no-replies">No replies yet. Be the first to respond!</p>
                )}

                {openPost.replies.map(r => (
                  <div key={r.id} className="forum-reply">
                    <img src={r.avatar} alt={r.author} className="forum-avatar" />
                    <div className="forum-reply__content">
                      <div className="forum-reply__top">
                        <span className="forum-reply__author">{r.author}</span>
                        <span className="forum-reply__time">{r.time}</span>
                      </div>
                      <p className="forum-reply__text">{r.text}</p>
                      <button className="forum-reply__like">
                        <Heart size={13} style={{ marginRight: 4 }} /> {r.likes}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              <div className="forum-reply-box">
                <img
                  src="https://api.dicebear.com/7.x/thumbs/svg?seed=JohnDoe"
                  alt="You"
                  className="forum-avatar"
                />
                <div className="forum-reply-box__input-wrap">
                  <textarea
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    rows={3}
                  />
                  <button
                    className="forum-reply-box__submit"
                    onClick={() => submitReply(openPost.id)}
                    disabled={!replyText.trim()}
                  >
                    <Send size={14} style={{ marginRight: 6 }} /> Send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── New Post Modal ── */}
      {showNewPost && (
        <div className="forum-modal-overlay" onClick={() => setShowNewPost(false)}>
          <div className="forum-modal forum-modal--sm" onClick={e => e.stopPropagation()}>
            <div className="forum-modal__header">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Edit3 size={18} /> Create New Post
              </h3>
              <button className="forum-modal__close" onClick={() => setShowNewPost(false)}>
                <X size={18} />
              </button>
            </div>
            <form className="forum-new-post-form" onSubmit={submitNewPost}>
              <div className="forum-field">
                <label>Category</label>
                <select
                  value={newPost.category}
                  onChange={e => setNewPost({ ...newPost, category: e.target.value })}
                >
                  {categories.filter(c => c.id !== 'all').map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div className="forum-field">
                <label>Title *</label>
                <input
                  placeholder="What's your question or topic?"
                  value={newPost.title}
                  onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                  maxLength={120}
                  required
                />
                <span className="forum-field__count">{newPost.title.length}/120</span>
              </div>
              <div className="forum-field">
                <label>Details *</label>
                <textarea
                  placeholder="Share more context, ask your question in detail..."
                  value={newPost.body}
                  onChange={e => setNewPost({ ...newPost, body: e.target.value })}
                  rows={5}
                  required
                />
              </div>
              <div className="forum-new-post-form__actions">
                <button type="button" className="forum-btn forum-btn--outline" onClick={() => setShowNewPost(false)}>
                  Cancel
                </button>
                <button type="submit" className="forum-btn forum-btn--primary">
                  <Rocket size={14} style={{ marginRight: 6 }} /> Post Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ── Post Card Component ── */
const PostCard = ({ post, liked, onLike, onOpen, getCategoryConfig }) => {
  const cfg = getCategoryConfig(post.category);
  return (
    <div className="forum-post-card" onClick={onOpen}>
      {post.pinned && (
        <span className="forum-post-card__pin">
          <Pin size={13} />
        </span>
      )}

      <div className="forum-post-card__top">
        <img src={post.avatar} alt={post.author} className="forum-avatar" />
        <div className="forum-post-card__meta">
          <span className="forum-post-card__author">{post.author}</span>
          <span className="forum-post-card__time">{post.time}</span>
        </div>
        <span className={`forum-cat-tag forum-cat-tag--${post.category}`}>
          {cfg.icon}
          <span style={{ marginLeft: 4 }}>{cfg.label}</span>
        </span>
      </div>

      <h3 className="forum-post-card__title">{post.title}</h3>
      <p className="forum-post-card__preview">
        {post.body.length > 140 ? post.body.slice(0, 140) + '...' : post.body}
      </p>

      <div className="forum-post-card__footer">
        <button
          className={`forum-like-btn${liked ? ' forum-like-btn--active' : ''}`}
          onClick={e => { e.stopPropagation(); onLike(); }}
        >
          <Heart
            size={14}
            style={{ marginRight: 4 }}
            fill={liked ? 'currentColor' : 'none'}
          />
          {post.likes}
        </button>
        <span className="forum-post-card__replies">
          <MessageCircle size={14} style={{ marginRight: 4 }} />
          {post.replies.length} replies
        </span>
        <span className="forum-post-card__views">
          <Eye size={14} style={{ marginRight: 4 }} />
          {post.views}
        </span>
        <span className="forum-post-card__read-more">Read more →</span>
      </div>
    </div>
  );
};

export default Forum;