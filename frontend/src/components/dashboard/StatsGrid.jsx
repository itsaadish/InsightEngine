import React from 'react';
import { FileText, BookOpen, Users, Award } from 'lucide-react';
import StatsCard from './StatsCard';

const StatsGrid = ({ displayStats, totalTeachers, showTeacherBadge, timeframe }) => {
  const periodLabel = {
    'week': 'This week',
    'month': 'This month',
    'year': 'This year',
    'all': 'All time'
  }[timeframe] || 'This week';

  return (
    <section className="stats-grid">
      <StatsCard 
        title="Active Teachers" 
        value={totalTeachers} 
        icon={Users} 
        variant="lavender" 
        period={periodLabel}
      />
      <StatsCard 
        title="Lessons Created" 
        value={displayStats.lesson} 
        icon={BookOpen} 
        variant="green" 
        period={periodLabel}
      />
      <StatsCard 
        title="Assessments Made" 
        value={displayStats.assessment} 
        icon={BookOpen} 
        variant="cream" 
        period={periodLabel}
      />
      <StatsCard 
        title="Quizzes Conducted" 
        value={displayStats.quiz} 
        icon={BookOpen} 
        variant="yellow" 
        period={periodLabel}
      />
      <StatsCard 
        title="Submission Rate" 
        value="0%" 
        icon={Award} 
        variant="pink" 
        period={periodLabel}
      />
    </section>
  );
};

export default StatsGrid;
