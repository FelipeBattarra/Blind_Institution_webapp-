'use client';

interface WelcomeMsgProps {
  message: String;
}

const WelcomeMsg: React.FC<WelcomeMsgProps> = ({ message }) => {

  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl lg:text-2xl text-white font-medium">
        Bem vindo de volta Usuário👋🏻
      </h2>
      <p className="text-sm lg:text-base text-[#89b6fd]">
        {message}
      </p>
    </div>
  );
};

export default WelcomeMsg;
