import { UserInfos } from "../../types/user";
import { axiosInstance } from "../../utils";

const BUSINESS_KEY = process.env.REACT_APP_BUSINESS_KEY;

interface Payload {
  owner: string;
  openDate: string;
  businessNumber: string;
}

export interface Business {
  request_cnt: number;
  valid_cnt: number;
  status_code: string;
  data: BusinessData[];
}

export interface BusinessData {
  b_no: string;
  valid: string;
  request_param: RequestParam;
  status: Status;
}

export interface RequestParam {
  b_no: string;
  start_dt: string;
  p_nm: string;
}

export interface Status {
  b_no: string;
  b_stt: string;
  b_stt_cd: string;
  tax_type: string;
  tax_type_cd: string;
  end_dt: string;
  utcc_yn: string;
  tax_type_change_dt: string;
  invoice_apply_dt: string;
}

export const businessValidate = async (payload: Payload): Promise<Business> => {
  const { owner, openDate, businessNumber } = payload;
  const { data } = await axiosInstance.post(
    `http://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=${BUSINESS_KEY}`,
    {
      businesses: [
        {
          b_no: businessNumber,
          start_dt: openDate,
          p_nm: owner,
        },
      ],
    }
  );

  return data;
};

export const changeUserRole = async (): Promise<UserInfos> => {
  const { data } = await axiosInstance.patch(
    `/v1/user/update`,
    {
      userRole: "ROLE_OWNER",
    },
    {
      headers: { tokenNeeded: true },
    }
  );

  return data.data;
};
