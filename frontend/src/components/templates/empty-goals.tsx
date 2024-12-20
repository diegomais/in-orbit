import logo from '@/assets/in-orbit-logo.svg'
import letsStart from '@/assets/lets-start-illustration.svg'
import CreateGoal from './create-goal'

const EmptyGoals = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="in.orbit" />
      <img src={letsStart} alt="Let's start illustration" />

      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        You haven't registered any goals yet, how about registering one right
        now?
      </p>

      <CreateGoal />
    </div>
  )
}

export default EmptyGoals
