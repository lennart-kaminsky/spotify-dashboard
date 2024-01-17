import { useSession } from "next-auth/react";
import Image from "next/image";
import styled from "styled-components";

export default function Header({ showUserInfo, onToggleUserInfo }) {
  const { data: session } = useSession();

  return (
    <>
      <header>
        {showUserInfo ? (
          <>
            <h1>{session.user.name}</h1>
          </>
        ) : (
          <h1>Spotify Dashboard</h1>
        )}
        {session && (
          <NoStylesButton onClick={() => onToggleUserInfo()}>
            {showUserInfo ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                width="50"
                fill="var(--fontColor)"
              >
                <title>cancel</title>
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            ) : (
              <StyledImage
                src={session.user.image}
                alt="account photo"
                height={300}
                width={300}
              />
            )}
          </NoStylesButton>
        )}
      </header>
    </>
  );
}

const NoStylesButton = styled.button`
  all: unset;
`;

const StyledImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 100%;
`;
