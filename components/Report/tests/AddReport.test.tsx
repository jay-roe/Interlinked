import { addDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { typeCollection } from '@/config/firestore';
import { createReport } from '../AddReport';

jest.mock('firebase/firestore');
jest.mock('@/config/firestore', () => ({
  db: { users: 'users' },
  typeCollection: jest.fn(),
}));

const mockedAddDoc = addDoc as jest.Mock<any>;
const mockedUpdateDoc = updateDoc as jest.Mock<any>;
const mockedTypeCollection = typeCollection as jest.Mock<any>;

describe('createReport', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add a new report document to Firestore', async () => {
    // Arrange
    const context = 'test context';
    const reporter = 'test reporter';
    const reporterName = 'test reporter name';
    const reported = 'test reported';
    const reportedName = 'test reported name';
    const read = false;
    const chatroomId = 'test chatroomId';
    const adminId = 'test adminId';
    const newDocId = 'test newDocId';
    const mockReportRef = { mockReportRef: true };

    mockedAddDoc.mockResolvedValueOnce({ id: newDocId });
    mockedTypeCollection.mockReturnValueOnce(mockReportRef);

    // Act
    const result = await createReport({
      context,
      reporter,
      reporterName,
      reported,
      reportedName,
      read,
      chatroomId,
      adminId,
    });

    // Assert
    expect(result).toEqual(newDocId);
    expect(mockedAddDoc).toHaveBeenCalledWith(mockReportRef, {
      reportTime: Timestamp.fromDate(new Date()),
      context,
      reporter,
      reporterName,
      reported,
      reportedName,
      read,
      chatroomId,
    });
    expect(mockedUpdateDoc).toHaveBeenCalledWith(
      { id: newDocId },
      { reportId: newDocId }
    );
  });
});
