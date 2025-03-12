export type QuestionBlock = {
  title: string;
  attributes: string[];
  values: string[];
  quest3?: QuestionBlock;
  quest2?: QuestionBlock;
};

export type ExtendedQuestionBlock = {
  quest2?: QuestionBlock;
  quest3?: QuestionBlock;
  quest4?: QuestionBlock;
};

export type PeopleList = {
  startQuestion: QuestionBlock;
  finalQuestion: QuestionBlock;
  extraQuestionOne: QuestionBlock;
  extraQuestionTwo: QuestionBlock;
  man: ExtendedQuestionBlock;
  woman: ExtendedQuestionBlock;
  kids: ExtendedQuestionBlock;
  teenager: ExtendedQuestionBlock;
  couple: ExtendedQuestionBlock;
  boss: ExtendedQuestionBlock;
  parents: ExtendedQuestionBlock;
  friend: ExtendedQuestionBlock;
};
