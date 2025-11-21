interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'indigo';
}

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  indigo: 'bg-indigo-100 text-indigo-600',
};

export default function FeatureCard({ title, description, icon, color }: FeatureCardProps) {
  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <div className={`w-10 h-10 sm:w-12 sm:h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center mb-3 sm:mb-4`}>
        {icon}
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1.5 sm:mb-2">{title}</h3>
      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{description}</p>
    </div>
  );
}

