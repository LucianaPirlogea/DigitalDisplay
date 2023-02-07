namespace DigitalDisplayBO.API.Repositories
{
    public interface IGenericRepository<TEntity> where TEntity : class, new()
    {
        IEnumerable<TEntity> GetAll();

        Task<IEnumerable<TEntity>> GetAllAsync();

        TEntity GetById(int id);

        Task<TEntity> GetByIdAsync(int id, bool asNoTracking = false);

        Task<TEntity> AddAsync(TEntity entity);
        Task<TEntity> UpdateAsync(TEntity entity);
        Task<bool> DeleteAsync(int id);
    }
}
