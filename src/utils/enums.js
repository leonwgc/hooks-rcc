//  https://api.zuifuli.com/api/duncan/v1/cfg/load?type=RelationTypeEnum
export const relation = [
  { name: '父母', code: 'P', value: 'P' },
  { name: '子女', code: 'C', value: 'C' },
  { name: '配偶', code: 'S', value: 'S' },
  { name: '同事', code: 'W', value: 'W' },
  { name: '自己', code: 'S', value: 'S' },
  { name: '其他', code: 'O', value: 'O' },
];

//  https://api.zuifuli.com/api/duncan/v1/cfg/load?type=CertiTypeEnum
export const certType = [
  { name: '身份证', code: 'I', value: '1' },
  { name: '护照', code: 'P', value: '2' },
  { name: '出生证', code: 'B', value: '3' },
  { name: '驾照', code: 'D', value: '4' },
  { name: '军官证', code: 'M', value: '5' },
  { name: '其他', code: 'Q', value: '6' },
  { name: '税务登记证', code: 'T', value: '7' },
  { name: '执照', code: 'L', value: '8' },
  { name: '组织机构证', code: 'O', value: '9' },
  { name: '港台同胞证', code: 'GT', value: '10' },
  { name: '士兵证', code: 'S', value: '11' },
  { name: '返乡证', code: 'F', value: '12' },
  { name: '组织机构代码', code: 'Z', value: '13' },
  { name: '港澳通行证', code: 'GA', value: '14' },
  { name: '台湾通行证', code: 'TW', value: '15' },
  { name: '户口簿', code: 'H', value: '16' },
  { name: '学生证', code: 'X', value: '17' },
  { name: '国际海员证', code: 'G', value: '18' },
  { name: '外国人永久居留证', code: 'J', value: '19' },
  { name: '旅行证', code: 'LX', value: '20' },
  { name: '警官证', code: 'PL', value: '21' },
  { name: '港澳居民来往内地通行证', code: 'GJ', value: '22' },
  { name: '台胞证', code: 'TB', value: '23' },
  { name: '统一社会信用代码', code: 'TY', value: '24' },
];
export const hasSocialInsurance = [
  { code: 'Y', name: '有 (含新农合)' },
  { code: 'N', name: '无' },
];

export const maritalStatus = [
  { name: '已婚', code: 'Y' },
  { name: '未婚', code: 'N' },
];

// https://api.zuifuli.com/api/duncan/v1/cfg/load?type=PoliticStatusEnum
export const politicStatus = [
  { name: '中共党员', code: 'CP', value: '1' },
  { name: '中共预备党员', code: 'PRE', value: '2' },
  { name: '民主党派', code: 'DP', value: '3' },
  { name: '共青团员', code: 'LM', value: '4' },
  { name: '群众', code: 'PP', value: '5' },
];

// https://api.zuifuli.com/api/duncan/v1/cfg/load?type=EducationLevelEnum
export const educationLevel = [
  { name: '小学', code: 'PS', value: '10' },
  { name: '初中', code: 'JS', value: '15' },
  { name: '中专', code: 'STS', value: '20' },
  { name: '高中', code: 'SMS', value: '25' },
  { name: '大专', code: 'C', value: '30' },
  { name: '本科', code: 'U', value: '35' },
  { name: '硕士', code: 'M', value: '40' },
  { name: '博士', code: 'D', value: '45' },
  { name: '博士后', code: 'P', value: '50' },
  { name: '其他', code: 'O', value: '60' },
];

// https://api.zuifuli.com/api/duncan/v1/cfg/load?type=HouseholdTypeEnum
export const householdType = [
  { name: '城镇', code: 'U', value: '30' },
  { name: '农业', code: 'R', value: '35' },
  { name: '外地城镇（省内）', code: 'IU', value: '40' },
  { name: '外地农村（省内）', code: 'IR', value: '45' },
  { name: '外地城镇（省外）', code: 'OU', value: '50' },
  { name: '外地农村（省外）', code: 'OR', value: '55' },
];

export const getRelationText = (code) => {
  const item = relation.filter((item) => item.code == code)[0];
  if (item) {
    return item.name;
  }
  return '';
};

export const getCertTypeText = (code) => {
  let type = certType.filter((item) => item.code == code)[0];
  return type ? type.name : '';
};

const genderMap = {
  M: '男',
  F: '女',
};
export const getGenderText = (code) => {
  return genderMap[code];
};

export const getYesNoText = (code, data = ['有', '无']) => {
  const index = code === 'Y' ? 0 : 1;
  return data[index];
};
