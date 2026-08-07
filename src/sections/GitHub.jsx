import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch, FaUsers, FaUserFriends, FaEnvelope } from 'react-icons/fa';
import './GitHub.css';

const PROFILES = [
  {
    username: 'logfrozeofficial',
    label: 'Primary',
    email: 'logfrozeofficial@gmail.com',
    color: '#58a6ff',
  },
  {
    username: 'logfroze',
    label: 'Secondary',
    email: 'logfroze@gmail.com',
    color: '#3fb950',
  },
];

function ProfileCard({ config }) {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${config.username}`),
          fetch(`https://api.github.com/users/${config.username}/repos?sort=updated&per_page=3`),
        ]);
        const profileData = await profileRes.json();
        const reposData = await reposRes.json();
        setProfile(profileData);
        setRepos(Array.isArray(reposData) ? reposData : []);
      } catch (err) {
        console.error('GitHub API error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [config.username]);

  if (loading) return (
    <div className="github-profile-card card-base github-profile-loading">
      <div className="github-profile-loading-text">Loading {config.label} profile...</div>
    </div>
  );

  if (!profile || profile.message) return null;

  return (
    <div className="github-full-profile card-base">
      {/* Profile badge */}
      <div className="github-profile-badge" style={{ background: config.color }}>
        {config.label}
      </div>

      {/* Profile header */}
      <div className="github-profile-header">
        <img
          src={profile.avatar_url}
          alt={`${config.username} avatar`}
          className="github-avatar"
          loading="lazy"
        />
        <div className="github-profile-info">
          <h3>{profile.name || profile.login}</h3>
          <p className="github-bio">{profile.bio || 'Full Stack Developer & Digital Creator'}</p>
          <p className="github-email">
            <FaEnvelope style={{ marginRight: 6, color: config.color }} />
            {config.email}
          </p>
          <a
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-custom github-profile-btn"
            style={{ borderColor: config.color, color: config.color }}
          >
            <FaGithub /> View Profile
          </a>
        </div>
      </div>

      {/* Stats row */}
      <div className="github-stat-row">
        <div className="github-stat-pill">
          <FaCodeBranch />
          <span className="github-stat-number">{profile.public_repos}</span>
          <span className="github-stat-label">Repos</span>
        </div>
        <div className="github-stat-pill">
          <FaUsers />
          <span className="github-stat-number">{profile.followers}</span>
          <span className="github-stat-label">Followers</span>
        </div>
        <div className="github-stat-pill">
          <FaUserFriends />
          <span className="github-stat-number">{profile.following}</span>
          <span className="github-stat-label">Following</span>
        </div>
      </div>

      {/* Latest repos */}
      {repos.length > 0 && (
        <div className="github-mini-repos">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="github-mini-repo"
            >
              <span className="repo-name">{repo.name}</span>
              <span className="repo-stars"><FaStar /> {repo.stargazers_count}</span>
            </a>
          ))}
        </div>
      )}

      {/* Contribution graph */}
      <div className="github-graph">
        <img
          src={`https://ghchart.rshah.org/${config.color.replace('#', '')}/${config.username}`}
          alt={`${config.username} Contribution Graph`}
          className="github-chart"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default function GitHub() {
  return (
    <section className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Open Source</span>
          <h2 className="section-title">GitHub Activity</h2>
          <p className="section-subtitle">
            My open source contributions across two GitHub profiles.
          </p>
        </motion.div>

        <div className="github-dual-profiles">
          {PROFILES.map((config, i) => (
            <motion.div
              key={config.username}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <ProfileCard config={config} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
