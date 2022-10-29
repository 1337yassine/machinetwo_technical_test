namespace technical_test_api_infrastructure.Base
{
    public interface IBaseRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(object id);
        void Insert(T obj);
        void Update(T obj);
        Task DeleteAsync(object id);
        Task SaveAsync();
        void DetachEntity(T obj);
    }
}
