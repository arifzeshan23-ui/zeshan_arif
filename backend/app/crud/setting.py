from app.crud.base import CRUDBase
from app.models.setting import Setting
from app.schemas.setting import SettingCreate, SettingUpdate
from typing import Optional


class CRUDSetting(CRUDBase[Setting, SettingCreate, SettingUpdate]):
    def get_by_key(self, db, key: str) -> Optional[Setting]:
        return db.query(Setting).filter(Setting.key == key).first()

    def set_value(self, db, key: str, value: str) -> Setting:
        setting = self.get_by_key(db, key)
        if setting:
            setting.value = value
            db.commit()
            db.refresh(setting)
        else:
            setting = Setting(key=key, value=value)
            db.add(setting)
            db.commit()
            db.refresh(setting)
        return setting


setting_crud = CRUDSetting(Setting)
