type DomainType =
  | 'agerating'
  | 'assets'
  | 'company'
  | 'completionstatus'
  // | 'developer'
  | 'gamefeature'
  | 'game'
  | 'gamesource'
  | 'genre'
  | 'platform'
  // | 'publisher'
  | 'region'
  | 'series'
  | 'tag'
  | 'gamesonplatforms'

interface IdentifyDomainObjects {
  get id(): string
  get type(): DomainType
  get asString(): string
}

interface WithId {
  id: string
}

type Platform = WithId & {
  name: string
  background: string
  cover: string
  icon: string
}

type Genre = WithId & {
  name: string
}

type Tag = WithId & {
  name: string
}

type Publisher = WithId & {
  name: string
}

type Series = WithId & {
  name: string
}

type Source = WithId & {
  name: string
}

type Feature = WithId & {
  name: string
}

type Developer = WithId & {
  name: string
}

interface Score {
  get value(): string
}

type CompletionStatus = WithId & {
  name: string
}

type AgeRating = WithId & {
  name: string
}

type Playlist = WithId & {
  name: string
  games: GameOnPlatform[]
}

const runStates = [
  'installed',
  'installing',
  'launching',
  'running',
  'uninstalling',
  'not installed',
] as const
type RunState = (typeof runStates)[number]

type GameOnPlatform = WithId & {
  added: Date
  ageRating?: AgeRating
  background: string
  communityScore: Score
  completionStatus?: CompletionStatus
  cover: string
  criticScore: Score
  description: string
  developers?: Developer[]
  features?: Feature[]
  gameId: string
  genres?: Genre[]
  hidden: boolean
  icon: string
  isCustomGame: boolean
  name: string
  platform?: Platform
  publishers?: Publisher[]
  recentActivity: Date
  releaseDate: Date
  runState: RunState
  series?: Series[]
  sortName: string
  source?: Source
  tags?: Tag[]
}

interface IGame {
  get oid(): IdentifyDomainObjects
  get name(): string
  get background(): string
  get cover(): string
  get description(): string
  get series(): Series[]
  get platforms(): GameOnPlatform[]
}

interface IList<T> {
  get items(): T[]
}

type Match<T> = T & {
  matches: boolean
}
interface IMatchA<T> {
  matches(item: T): boolean
}
type GameAssetType = 'background' | 'cover' | 'icon'

type GameAsset = WithId & {
  file: Buffer
  related: IdentifyDomainObjects
  typeKey: GameAssetType
}

export type {
  AgeRating,
  CompletionStatus,
  Developer,
  DomainType,
  Feature,
  GameAsset,
  GameAssetType,
  GameOnPlatform,
  Genre,
  IGame,
  IList,
  IMatchA,
  IdentifyDomainObjects,
  Match,
  Platform,
  Playlist,
  Publisher,
  RunState,
  Score,
  Series,
  Source,
  Tag,
  WithId,
}
