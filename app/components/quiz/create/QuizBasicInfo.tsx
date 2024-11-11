interface QuizBasicInfoProps {
    title: string;
    description: string;
    onTitleChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
  }
  
  export default function QuizBasicInfo({
    title,
    description,
    onTitleChange,
    onDescriptionChange,
  }: QuizBasicInfoProps) {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-800 rounded-lg p-2.5 text-white text-sm"
            placeholder="Enter quiz title"
            required
            maxLength={100}
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            className="w-full bg-gray-900/50 border border-gray-800 rounded-lg p-2.5 text-white text-sm"
            rows={2}
            placeholder="Enter quiz description"
            required
            maxLength={500}
          />
        </div>
      </div>
    );
  }