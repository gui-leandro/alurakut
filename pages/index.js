import { useEffect, useState } from "react";
import Box from "../src/components/Box";
import MainGrid from "../src/components/MainGrid";
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

function ProfileSideBar(props) {
  return (
    <Box>
      <img
        src={`https://github.com/${props.githubUser}.png`}
        style={{ borderRadius: "8px" }}
        alt="perfil"
      />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smalltitle">
        {props.title} ({props.items.length})
      </h2>
      <ul>
        {/* {pessoasFavoritas.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={`/users/${itemAtual}`}>
                <img src={`https://github.com/${itemAtual}.png`} />
                <span>{itemAtual}</span>
              </a>
            </li>
          );
        })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {
  const [seguidores, setSeguidores] = useState([]);
  const [comunidades, setComunidades] = useState([
    {
      id: "2021-07-14T01:33:34.025Z",
      title: "Eu odeio acordar cedo",
      image: "https://alurakut.vercel.app/capa-comunidade-01.jpg",
    },
  ]);
  const githubUser = "gui-leandro";
  const pessoasFavoritas = [
    "juunegreiros",
    "omariosouto",
    "peas",
    "rafaballerini",
    "marcobrunodev",
    "felipefialho",
  ];

  function handleCreateComunity(e) {
    e.preventDefault();

    const inputData = new FormData(e.target);
    const newComunity = {
      id: new Date().toISOString(),
      title: inputData.get("title"),
      image: inputData.get("image"),
    };

    const updateComunities = [...comunidades, newComunity];
    setComunidades(updateComunities);
  }

  useEffect(() => {
    fetch(
      `https://api.github.com/users/${githubUser}/followers`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        setSeguidores(response);
      });
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div
          className="profileArea"
          style={{
            gridArea: "profileArea",
          }}
        >
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div
          className="welcomeArea"
          style={{
            gridArea: "welcomeArea",
          }}
        >
          <Box>
            <h1 className="title">Bem-vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={(e) => handleCreateComunity(e)}>
              <div>
                <input
                  placeholder="Qual será o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual será o nome da sua comunidade?"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{
            gridArea: "profileRelationsArea",
          }}
        >
          <ProfileRelationsBox title="Seguidores" items={seguidores} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smalltitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades?.map((comunidade) => {
                return (
                  <li key={comunidade.id}>
                    <a href={`/users/${comunidade.title}`}>
                      <img src={comunidade.image} />
                      <span>{comunidade.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smalltitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
