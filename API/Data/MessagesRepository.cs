using System;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;

namespace API.Data;

public class MessagesRepository(DataContext context) : IMessageRepository
{
    public void AddMessage(Messages message)
    {
        context.Messages.Add(message);
    }

    public void DeleteMessage(Messages message)
    {
        context.Messages.Remove(message);
    }

    public async Task<Messages?> GetMessages(int id)
    {
        return await context.Messages.FindAsync(id);
    }

    public Task<PagedList<MessagesDto>> GetMessagesForUser()
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<MessagesDto>> GetMessagesThread(string currentUsername, string recipientUsername)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
