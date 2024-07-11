import { create } from '../../../../oid'
import type { GameReleaseResolvers } from './../../../types.generated'

export const GameRelease: GameReleaseResolvers = {
  id: async (_parent, _arg, _ctx) => {
    return create('GameRelease', _parent.id).toString()
  },
  platform: async (_parent, _arg, _ctx) => {
    return _parent.platformSource
  },
  game: async (_parent, _arg, _ctx) => {
    return _ctx.api.gameRelease.getByName(_parent.name)
  },
  completionStatus: async (_parent, _arg, _ctx) => {
    return _ctx.api.completionStatus.getById(_parent.completionStatusId)
  },
  features: async (_parent, _arg, _ctx) => {
    return Promise.all(
      (_parent.featureIds ?? []).map((id) => {
        return _ctx.api.feature.getById(id)
      }),
    )
  },
}
