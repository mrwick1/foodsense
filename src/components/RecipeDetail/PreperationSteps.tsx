interface PreparationStepsProps {
    steps: string[];
  }
  
  export default function PreparationSteps({ steps }: PreparationStepsProps) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-5">Preparation</h2>
        <ol className="space-y-5">
          {steps.map((step, index) => (
            <li key={index} className="flex group">
              <div className="flex-shrink-0 h-7 w-7 rounded-full bg-white border border-gray-200 text-gray-700 flex items-center justify-center mr-3 mt-0.5 font-medium text-sm shadow-sm">
                {index + 1}
              </div>
              <p className="text-gray-700">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }
  