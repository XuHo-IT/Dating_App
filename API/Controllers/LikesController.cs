using System;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class LikesController(ILikeRepository likeRepository) : BaseAPIController
{
  [HttpPost("{targetUserId:int}")]
  public async Task<ActionResult> ToggleLike(int targetUserId)
{
    var sourceUserId = User.GetUserId();

    if (sourceUserId == targetUserId) return BadRequest("You cannot like yourself");

    var existingLike = await likeRepository.GetUserLike(sourceUserId, targetUserId);

    if (existingLike == null)
    {
        var like = new UserLike
        {
            SourceUserId = sourceUserId,
            TargetUserId = targetUserId
        };

        likeRepository.AddLike(like);
    }
    else
    {
        likeRepository.DeleteLike(existingLike);
    }

    if ( await likeRepository.SaveChanges()) return Ok();

    return BadRequest("Failed to update like");

    
}
   [HttpGet("list")]
   public async Task<ActionResult<IEnumerable<int>>> GetCurrentUserLikeids()
   {
    return Ok(await likeRepository.GetCurrentUserLikeIds(User.GetUserId()));
   }

   [HttpGet]
   public async Task<ActionResult<IEnumerable<MemberDto>>> GetUserLikes([FromQuery]LikesParams likesParams)
   {
    likesParams.UserId = User.GetUserId();
    var users = await likeRepository.GetUserLikes(likesParams);
    Response.AddPaginationHeader(users);
    return Ok(users);
   }
}
