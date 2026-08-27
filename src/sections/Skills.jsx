import { useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../data/skills';
import './Skills.css';

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);
  const activeCategory = skillCategories[activeTab];

  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Skills</span>
          <h2 className="section-title">What I Work With</h2>
          <p className="section-subtitle">
            A diverse toolkit spanning development, design, content creation, and professional tools.
          </p>
        </motion.div>

        <div className="skills-tabs">
          {skillCategories.map((cat, i) => (
            <button
              key={cat.title}
              className={`skills-tab ${activeTab === i ? 'active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Development: render sub-groups (Frontend / Backend / Database) */}
        {activeCategory.subGroups ? (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeCategory.subGroups.map((group, gi) => (
              <div key={group.label} className="skills-subgroup">
                <h4 className="skills-subgroup-label">{group.label}</h4>
                <div className="skills-grid">
                  {group.skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      className="skill-card card-base"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (gi * 0.1) + i * 0.05, duration: 0.3 }}
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    >
                      <div className="skill-icon">
                        <skill.icon />
                      </div>
                      <span className="skill-name">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          /* All other tabs: flat grid as before */
          <motion.div
            className="skills-grid"
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeCategory.skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                className="skill-card card-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="skill-icon">
                  <skill.icon />
                </div>
                <span className="skill-name">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
