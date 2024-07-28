import { Typography } from '@mui/material'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useCallback, useMemo, useState } from 'react'
import getGameApi from '../api/game/index.server'
import Header from '../components/Header'
import Drawer from '../components/Navigation/Drawer'
import OuterContainer from '../components/OuterContainer'
import RightDrawer from '../components/RightDrawer'
import FilteredGameList from '../domain/FilteredGameList'
import Game from '../domain/Game'
import GameList from '../domain/GameList'
import GameOnPlatform from '../domain/GameOnPlatform'
import { CompletionStatusPlaylist } from '../domain/Playlist'
import NoFilter from '../domain/filters/NoFilter'
import { GameOnPlatformDto, IGame } from '../domain/types'

async function loader({ request }: LoaderFunctionArgs) {
  try {
    const api = getGameApi()
    const games = await api.getGames()

    return json({
      lists: [
        new CompletionStatusPlaylist({
          completionStatusName: 'Playing',
          games: new GameList(games),
        }),
        new CompletionStatusPlaylist({
          completionStatusName: 'Plan to Play',
          games: new GameList(games),
        }),
      ],
    })
  } catch (e) {
    console.error(e)
    return json({
      lists: [],
    })
  }
}

const noFilter = new NoFilter()

function Index() {
  const data = (useLoaderData() || {}) as unknown as {
    lists: { completionStatusName: string; games: GameOnPlatformDto[][] }[]
  }

  const gameListPlaylists = useMemo(() => {
    return (
      data.lists.map(
        (list) =>
          new CompletionStatusPlaylist({
            completionStatusName: list.completionStatusName,
            games: new FilteredGameList(
              new GameList(
                list.games.map(
                  (g) => new Game(g.map((gp) => new GameOnPlatform(gp))),
                ),
              ),
              noFilter,
            ),
          }),
      ) ?? []
    )
  }, [data.lists])

  const [isRightDrawerOpen, setRightDrawerOpen] = useState(false)
  const [game, setGame] = useState<IGame | null>(null)
  const handleClose = useCallback(() => {
    setRightDrawerOpen(false)
  }, [])
  const handleGameSelect = useCallback((evt, game: IGame) => {
    setGame(game)
    setRightDrawerOpen(true)
  }, [])

  return (
    <Drawer>
      <OuterContainer>
        <Header>
          <Typography variant="h2">Library</Typography>
        </Header>
        {gameListPlaylists.map((playlist, index) => (
          <section data-test="playlist" key={`${playlist.toString()}${index}`}>
            <Typography variant="h4">{playlist.toString()}</Typography>
            {/* <HorizontalGameList
              games={playlist.games as unknown as IList<Match<IGame>>}
              noDeferCount={5}
              onSelect={handleGameSelect}
            /> */}
          </section>
        ))}
      </OuterContainer>
      <RightDrawer open={isRightDrawerOpen} onClose={handleClose}>
        {/* {game && <GameDetails game={game} />} */}
      </RightDrawer>
    </Drawer>
  )
}

export default Index
export { loader }
