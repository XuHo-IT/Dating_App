using System;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces;

public interface IMessageRepository
{
  void AddMessage(Messages message);
  void DeleteMessage(Messages message);
  Task<Messages?> GetMessages(int id);
  Task<PagedList<MessagesDto>> GetMessagesForUser();
  Task<IEnumerable<MessagesDto>> GetMessagesThread(string currentUsername, string recipientUsername);
  Task<bool> SaveAllAsync();
}
