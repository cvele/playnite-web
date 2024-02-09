import {
  ImageList,
  ImageListItem,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useFetcher } from '@remix-run/react'
import { FC, SyntheticEvent, useCallback, useMemo } from 'react'
import type { IGame, IList, Match } from '../domain/types'
import GameFigure from './GameFigure'
import useThemeWidth from './useThemeWidth'

const ImageListWithoutOverflow = styled(ImageList)`
  overflow-y: hidden;
  margin-top: 0;
`

const GameGrid: FC<{
  games: IList<Match<IGame>>
  noDeferCount: number
}> = ({ games, noDeferCount }) => {
  const fetcher = useFetcher()
  const playGame = useCallback(
    (evt: SyntheticEvent, id: string) => {
      fetcher.submit({ id }, { method: 'post', action: '/activate' })
    },
    [fetcher],
  )

  const theme = useTheme()
  const isXxl = useMediaQuery(theme.breakpoints.up('xxl'))
  const isXl = useMediaQuery(theme.breakpoints.up('xl'))
  const isLg = useMediaQuery(theme.breakpoints.up('lg'))
  const isMd = useMediaQuery(theme.breakpoints.up('md'))
  const isSm = useMediaQuery(theme.breakpoints.up('sm'))
  const isXs = useMediaQuery(theme.breakpoints.up('xs'))
  const columns = useMemo(() => {
    if (isXxl) return 6
    if (isXl) return 5
    if (isLg) return 4
    if (isMd) return 3
    if (isSm) return 2
    if (isXs) return 2
    return 2
  }, [isXxl, isXl, isLg, isMd, isSm, isXs])

  const width = useThemeWidth()
  const columnWidth = useMemo(() => {
    return Math.floor((width - columns * 16) / columns)
  }, [width, columns])
  const rowHeight = useMemo(() => {
    return columnWidth + 64
  }, [columnWidth])

  return (
    <>
      <ImageListWithoutOverflow rowHeight={rowHeight} cols={columns}>
        {games.items.map((game, gameIndex) => (
          <ImageListItem
            key={game.oid.asString}
            sx={(theme) => ({
              ...(!game.matches ? { display: 'none' } : {}),
              alignItems: 'center',
            })}
          >
            <GameFigure
              game={game}
              height={`${rowHeight}px`}
              noDefer={gameIndex <= noDeferCount}
              width={`calc(${columnWidth}px)`}
            >
              <Typography
                variant="caption"
                component="figcaption"
                sx={{
                  fontWeight: 'bold',
                  textWrap: 'balance',
                  lineHeight: '1.5',
                  textOverflow: 'ellipsis',
                  overflowY: 'hidden',
                  maxHeight: '4rem',
                  lineClamp: '2',
                  fontSize: '15px',
                  display: '-webkit-box',
                  '-webkit-line-clamp': '2',
                  '-webkit-box-orient': 'vertical ',
                }}
              >
                {game.name}
              </Typography>
              <Typography
                variant="body2"
                component="div"
                sx={{
                  textWrap: 'balance',
                  lineHeight: '1',
                  textOverflow: 'ellipsis',
                  overflowY: 'hidden',
                  maxHeight: '2rem',
                  lineClamp: '1',
                  fontSize: '13px',
                  display: '-webkit-box',
                  '-webkit-line-clamp': '1',
                  '-webkit-box-orient': 'vertical ',
                }}
              >
                {game.name}
              </Typography>
            </GameFigure>
          </ImageListItem>
        ))}
      </ImageListWithoutOverflow>
    </>
  )
}

export default GameGrid
