import { IPaginationRequest } from 'api/baseApi';
import { GridSortModel } from '@mui/x-data-grid';
import { IUserFilters, IUserSort, IUserSortFields } from 'api/usersApi';
import { AppThunk } from 'store/store';
import { users } from 'store';
import { notify } from 'store/common/thunks';

export const getUsersThunk =
  (
    pagination: IPaginationRequest,
    filters: IUserFilters,
    sorting: GridSortModel
  ): AppThunk =>
  async (dispatch, getState) => {
    const sort: IUserSort = {};
    if (sorting[0]) {
      sort.sortField = sorting[0].field as IUserSortFields;
      sort.sortDirection = sorting[0].sort as 'asc' | 'desc';
    }

    await dispatch(
      users.getUsers.thunk.request({
        query: {
          pagination,
          filters,
          sort,
        },
      })
    );
    const { error } = users.getUsers.selector.state(getState());
    if (error) {
      dispatch(notify(error.data.message, 'error'));
    }
  };
