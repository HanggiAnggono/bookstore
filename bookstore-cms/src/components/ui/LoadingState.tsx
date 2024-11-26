import { Progress } from './progress'

export const LoadingState = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-1/3">
        <p className="mb-3">Loading...</p>
        <Progress indeterminate className="h-1" />
      </div>
    </div>
  )
}
