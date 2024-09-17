import streamlit as st
import os

def check_password():
    if "password_correct" not in st.session_state:
        password = st.text_input("Enter password", type="password")
        if password:
            if password == os.getenv("STREAMLIT_APP_PASSWORD"):
                st.session_state["password_correct"] = True
            else:
                st.error("⚠️ Incorrect password")
        return False
    else:
        return True
