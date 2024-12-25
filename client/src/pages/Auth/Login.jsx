import LoginForm from "@/components/common/LoginForm"

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-Primary-dark-blue to-blue-400">
      <div className="w-5/6 h-5/6 bg-black/20 rounded-2xl shadow-lg flex justify-between items-center">
        <div className="flex flex-col h-full justify-between p-10 w-1/2">
          <img src="/logo.png" width={100} />
          <div className="flex flex-col space-y-4 justify-center items-center w-full">
            <h1 className="text-4xl text-white font-bold">Welcome Back !</h1>
            <p className="text-white">Login to your account</p>
          </div>
          <div></div>
        </div>
        <LoginForm/>
      </div>
    </div>
  )
}

export default Login